import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateAddressValidatorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  street: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5)
  number: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  zipCode: string;
}
