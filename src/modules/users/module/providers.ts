import { CreateUserService } from '@users/services/create-user';
import { DispatcherUserService } from '@users/services/dispatcher-user';
import { GetUserService } from '@users/services/get-user';
import { ValidatePhoneService } from '@users/services/validate-phone';

export const userModuleProviders = [
  CreateUserService,
  ValidatePhoneService,
  GetUserService,
  DispatcherUserService,
];
