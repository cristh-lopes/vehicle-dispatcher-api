import { IsDateString, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateDispatcherValidatorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsDateString()
  @IsNotEmpty()
  signatureDate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @IsUUID()
  @IsNotEmpty()
  addressId: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
