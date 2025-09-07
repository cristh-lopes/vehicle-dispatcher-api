import { Dispatcher } from '@dispatchers/database/entities/dispatcher.entity';

export type CreateDispatcherParams = {
  name: string;
  signatureDate: Date;
  document: string;
  addressId: string;
  planId: string;
};

export type CreateDispatcherResult = Dispatcher;
