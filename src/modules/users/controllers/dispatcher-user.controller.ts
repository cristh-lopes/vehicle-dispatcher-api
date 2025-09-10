import { Controller, Post, Body } from '@nestjs/common';
import { DispatcherUser } from '@users/database/entities/dispatcher-user.entity';
import { CreateDispatcherUserDto } from './validators/create-dispatcher-user.dto';
import { DispatcherUserService } from '@users/services/dispatcher-user';

@Controller('dispatcher-users')
export class DispatcherUserController {
  constructor(private readonly dispatcherUserService: DispatcherUserService) {}

  @Post()
  async create(@Body() dto: CreateDispatcherUserDto): Promise<DispatcherUser> {
    return this.dispatcherUserService.create(dto);
  }
}
