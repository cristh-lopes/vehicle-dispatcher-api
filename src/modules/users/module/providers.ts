import { CreateUserService } from '@users/services/create-user';
import { GetUserService } from '@users/services/get-user';
import { ValidatePhoneService } from '@users/services/validate-phone';

export const userModuleProviders = [CreateUserService, ValidatePhoneService, GetUserService];
