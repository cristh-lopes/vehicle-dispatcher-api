import { User } from '@users/database/entities/user.entity';

export type CreateUserParams = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type CreateUserResult = User;
