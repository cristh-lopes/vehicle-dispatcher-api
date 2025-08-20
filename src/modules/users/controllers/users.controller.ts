import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';

import { Role, Roles } from '@shared/guard/roles.decorator';
import { RolesGuard } from '@shared/guard/roles.guard';

import { CreateUserService } from '@users/services/create-user/create-user.service';
import { GetUserService } from '@users/services/get-user/get-user.service';
import { ValidatePhoneService } from '@users/services/validate-phone';

import { CreateUserValidatorDTO } from './validators/create-user.validator.dto';
import { ValidatePhoneValidatorDTO } from './validators/validate-phone.validator.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly validatePhoneService: ValidatePhoneService,
    private readonly getUserService: GetUserService,
  ) {}

  @Post()
  async createUser(@Body() params: CreateUserValidatorDTO) {
    return this.createUserService.executeWithTransaction(params);
  }

  @Post('phones/validate')
  async validatePhone(@Body() params: ValidatePhoneValidatorDTO) {
    return this.validatePhoneService.executeWithTransaction(params);
  }

  @Get()
  @Roles(Role.api)
  @UseGuards(RolesGuard)
  async getUser(@Headers() headers: Record<string, string>) {
    const id = headers['id'];
    const phone = headers['phone'];
    const email = headers['email'];

    return this.getUserService.execute({ id, phone, email });
  }
}
