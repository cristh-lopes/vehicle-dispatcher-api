import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetCitiesValidationDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  state: string;
}
