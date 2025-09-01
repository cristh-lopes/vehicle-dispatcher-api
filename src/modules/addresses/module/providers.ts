import { GetCitiesService } from '@addresses/services/get-cities';
import { UpdateCitiesService } from '@addresses/services/update-cities';

export const addressModuleProviders = [GetCitiesService, UpdateCitiesService];
