import { CreatePlansService } from '@dispatchers/services/create-plans';
import { GetPlansService } from '@dispatchers/services/get-plans';
import { UpdatePlansService } from '@dispatchers/services/update-plans';

export const dispatcherModuleProviders = [CreatePlansService, GetPlansService, UpdatePlansService];
