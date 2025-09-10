import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispatcherUser } from '@users/database/entities/dispatcher-user.entity';
import { User } from '@users/database/entities/user.entity';
import { Dispatcher } from '@dispatchers/database/entities/dispatcher.entity';
import { CreateDispatcherUserDto } from '@users/controllers/validators/create-dispatcher-user.dto';

@Injectable()
export class DispatcherUserService {
  constructor(
    @InjectRepository(DispatcherUser)
    private readonly dispatcherUserRepo: Repository<DispatcherUser>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Dispatcher)
    private readonly dispatcherRepo: Repository<Dispatcher>,
  ) {}

  async create(dto: CreateDispatcherUserDto): Promise<DispatcherUser> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const dispatcher = await this.dispatcherRepo.findOne({ where: { id: dto.dispatcherId } });
    if (!dispatcher) throw new NotFoundException('Dispatcher not found');

    const dispatcherUser = this.dispatcherUserRepo.create({
      user,
      dispatcher,
      role: dto.role,
      permitions: dto.permitions,
    });

    return this.dispatcherUserRepo.save(dispatcherUser);
  }
}
