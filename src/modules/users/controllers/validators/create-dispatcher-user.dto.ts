import { IsUUID, IsEnum, IsOptional, IsArray, ArrayUnique } from 'class-validator';
import { UserRole } from '@users/enums/user-role.enum';

export class CreateDispatcherUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  dispatcherId: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  permitions?: string[];
}
