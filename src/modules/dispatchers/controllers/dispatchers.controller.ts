import { Body, Controller, Headers, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@shared/guard/roles.guard';
import { CreateDispatcherValidatorDTO } from './validators/create-dispatcher.dto';
import { CreateDispatcherService } from '@dispatchers/services/create-dispatchers';

@Controller('dispatchers')
export class DispatchersController {
  constructor(private readonly createDispatcherService: CreateDispatcherService) {}

  @Post()
  @UseGuards(RolesGuard)
  async createDispatcher(
    @Headers() headers: Record<string, string>,
    @Body() params: CreateDispatcherValidatorDTO,
  ) {
    const userId: string | undefined = headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('User id not found in token');
    }

    return this.createDispatcherService.executeWithTransaction(params);
  }
}
