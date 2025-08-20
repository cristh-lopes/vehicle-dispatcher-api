import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY, Role } from './roles.decorator';
import { EnvConfigService } from '../config/env';
import { FirebaseAuthProvider } from '../core/firebase';
import { AppLogger } from '../core/logger';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly apiKey: string;

  constructor(
    private readonly reflector: Reflector,
    private readonly envConfigService: EnvConfigService,
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly logger: AppLogger,
  ) {
    this.apiKey = this.envConfigService.get('apiKeys.n8n');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 👇 Aqui tipamos explicitamente o request
    const request = context.switchToHttp().getRequest<Request>();

    if (requiredRoles.includes(Role.api)) {
      const apiKey = request.headers['x-api-key'] as string | undefined;
      const userId = request.headers['user-id'] as string | undefined;

      if (!apiKey) {
        throw new UnauthorizedException('API key is required');
      }

      if (!userId) {
        throw new UnauthorizedException('User id is required');
      }

      if (apiKey !== this.apiKey) {
        throw new UnauthorizedException('Invalid API key');
      }

      return true;
    }

    if (requiredRoles.includes(Role.user)) {
      const authHeader: string | undefined = request.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
      }

      const token = authHeader.slice('Bearer '.length);

      try {
        const decoded = await this.firebaseAuthProvider.auth.verifyIdToken(token);

        request.headers['user-id'] = decoded.uid;

        return true;
      } catch (err) {
        this.logger.error(String(err));
        throw new UnauthorizedException('Invalid or expired token');
      }
    }

    throw new ForbiddenException('Access denied');
  }
}
