import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { Either, Failure, Success } from '../either';
import { AppLogger } from '../logger';
import { FirebaseAppProvider } from './firebase.provider';

@Injectable()
export class FirebaseAuthProvider {
  auth: admin.auth.Auth;

  constructor(
    private readonly firebaseAppProvider: FirebaseAppProvider,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FirebaseAuthProvider.name);
    this.auth = this.firebaseAppProvider.getApp().auth();
  }

  async createUser(
    params: admin.auth.CreateRequest,
  ): Promise<Either<Error, admin.auth.UserRecord>> {
    try {
      const userRecord = await this.auth.createUser(params);
      return Success.create(userRecord);
    } catch (err: unknown) {
      const errorMessage = this.getFirebaseErrorMessage(err, params);
      return Failure.create(new BadRequestException(errorMessage));
    }
  }

  private getFirebaseErrorMessage(error: unknown, params: unknown): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error &&
      typeof error?.message === 'string'
    ) {
      const fbError = error as { code: string; message: string };
      this.logger.error('Firebase Auth Error', params ?? {}, {
        code: fbError.code,
        message: fbError.message,
      });
      return fbError.message;
    }

    if (error instanceof Error) {
      this.logger.error('Unexpected Error', params ?? {}, {
        message: error.message,
        stack: error.stack,
      });
      return error.message;
    }

    this.logger.error('Unknown Error', params ?? {}, { error });
    return 'Unexpected error while creating user';
  }
}
