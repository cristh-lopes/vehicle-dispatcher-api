import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Role, Roles } from '@shared/guard/roles.decorator';
import { RolesGuard } from '@shared/guard/roles.guard';
import { CreatePlanValidatorDTO } from './validators/create-plan.dto';
import { CreatePlansService } from '@dispatchers/services/create-plans';
import { GetPlansService } from '@dispatchers/services/get-plans';
import { GetByIdValidationDTO } from './validators/get-by-id.dto';
import { UpdatePlanValidatorDTO } from './validators/update-plan.dto';
import { UpdatePlansService } from '@dispatchers/services/update-plans';
import { DeletePlansService } from '@dispatchers/services/delete-plans';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly createPlansService: CreatePlansService,
    private readonly getPlansService: GetPlansService,
    private readonly updatePlansService: UpdatePlansService,
    private readonly deletePlansService: DeletePlansService,
  ) {}

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

  @Get()
  @UseGuards(RolesGuard)
  async getPlans() {
    return this.getPlansService.getAll();
  }

  @Get(':id')
  @Roles(Role.user)
  async getById(@Param() { id }: GetByIdValidationDTO) {
    return this.getPlansService.getById(id);
  }

  @Put(':id')
  @Roles(Role.user)
  @UseGuards(RolesGuard)
  async updatePlan(@Param() { id }: GetByIdValidationDTO, @Body() data: UpdatePlanValidatorDTO) {
    return this.updatePlansService.executeWithTransaction({ id, ...data });
  }

  @Delete(':id')
  @Roles(Role.user)
  @UseGuards(RolesGuard)
  async deletePlan(@Param() { id }: GetByIdValidationDTO) {
    return this.deletePlansService.executeWithTransaction(id);
  }
}
