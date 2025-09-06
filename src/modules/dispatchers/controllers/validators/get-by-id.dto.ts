import { IsUUID } from 'class-validator';

export class GetByIdValidationDTO {
  @IsUUID()
  id: string;
}
