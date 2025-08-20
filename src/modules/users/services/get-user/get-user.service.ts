import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/database/entities/user.entity';

import { GetUserParams, GetUserResponse } from './get-user.dto';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute({ id, phone, email }: GetUserParams): Promise<GetUserResponse> {
    if (!id && !phone && !email) {
      throw new BadRequestException('Invalid params');
    }

    const user = await this.userRepository.findOne({
      where: { id, phone, email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      phoneValidated: user.phoneValidated,
    };
  }
}
