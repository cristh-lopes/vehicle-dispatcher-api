import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/database/entities/user.entity';
import { DispatcherUser } from '@users/database/entities/dispatcher-user.entity';
import { AssociateUserResponse } from './associate-user.dto';

@Injectable()
export class AssociateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DispatcherUser)
    private readonly dispatcherUserRepository: Repository<DispatcherUser>,
  ) {}

  async execute(id: string): Promise<AssociateUserResponse> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('Invalid params');
    }

    // Buscar usuário
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    // Buscar dispatcherUsers e seus dispatchers
    const dispatcherUsers = await this.dispatcherUserRepository
      .createQueryBuilder('du')
      .leftJoinAndSelect('du.dispatcher', 'dispatcher')
      .where('du.user_id = :userId', { userId: id })
      .getMany();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      phoneValidated: user.phoneValidated,
      dispatcherUsers: dispatcherUsers.map((du) => ({
        id: du.id,
        role: du.role,
        permitions: du.permitions,
        dispatcher: du.dispatcher
          ? {
              id: du.dispatcher.id,
              name: du.dispatcher.name,
              signatureDate: du.dispatcher.signatureDate,
              document: du.dispatcher.document,
            }
          : null,
      })),
    };
  }
}
