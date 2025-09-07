// src/modules/dispatchers/controllers/plans/validators/update-plan.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePlanValidatorDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  price?: number;
}
