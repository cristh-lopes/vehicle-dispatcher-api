import { Address } from '@addresses/database/entities/address.entity';

export type GetAddressesResult = Promise<Address[]>;

export type GetOneAddressResult = Promise<Address>;
