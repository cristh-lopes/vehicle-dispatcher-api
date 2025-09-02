import { CreateAddressService } from '@addresses/services/create-address';
import { GetCitiesService } from '@addresses/services/get-cities';
import { UpdateCitiesService } from '@addresses/services/update-cities';

export const addressModuleProviders = [CreateAddressService, GetCitiesService, UpdateCitiesService];
