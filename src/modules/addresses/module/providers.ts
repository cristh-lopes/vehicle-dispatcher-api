import { CreateAddressService } from '@addresses/services/create-address';
import { GetAddressesService } from '@addresses/services/get-addresses';
import { GetCitiesService } from '@addresses/services/get-cities';
import { UpdateCitiesService } from '@addresses/services/update-cities';

export const addressModuleProviders = [
  CreateAddressService,
  GetAddressesService,
  GetCitiesService,
  UpdateCitiesService,
];
