import { CreatePlansService } from '@dispatchers/services/create-plans';
import { GetPlansService } from '@dispatchers/services/get-plans';

export const dispatcherModuleProviders = [CreatePlansService, GetPlansService];
