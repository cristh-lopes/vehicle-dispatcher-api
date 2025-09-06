import { Body, Controller, Headers, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Role, Roles } from '@shared/guard/roles.decorator';
import { RolesGuard } from '@shared/guard/roles.guard';
import { CreatePlanValidatorDTO } from './validators/create-plan.dto';
import { CreatePlansService } from '@dispatchers/services/create-plans';

@Controller('plans')
export class PlansController {
  constructor(private readonly createPlansService: CreatePlansService) {}

  @Post()
  @Roles(Role.user)
  @UseGuards(RolesGuard)
  async createPlan(
    @Headers() headers: Record<string, string>,
    @Body() params: CreatePlanValidatorDTO,
  ) {
    const userId: string | undefined = headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('User id not found in token');
    }

    return this.createPlansService.executeWithTransaction(params);
  }
}
