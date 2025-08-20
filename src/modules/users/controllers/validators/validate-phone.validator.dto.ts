import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class ValidatePhoneValidatorDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{0,14}$/, {
    message:
      'Phone number must be in E.164 format (e.g., +1234567890). It should start with + followed by 1-15 digits.',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'validationCode must be 6 characters long' })
  validationCode: string;
}
