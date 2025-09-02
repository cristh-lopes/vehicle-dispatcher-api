import { Address } from '@addresses/database/entities/address.entity';

export type CreateAddressParams = {
  cityId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  zipCode: string;
};

export type CreateAddressResult = Address;
