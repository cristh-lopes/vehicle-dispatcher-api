import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { Address } from '@addresses/database/entities/address.entity';
import { CreateAddressParams, CreateAddressResult } from './create-address.dto';

@Injectable()
export class CreateAddressService extends TransactionHandler<
  CreateAddressParams,
  CreateAddressResult
> {
  protected queryRunner: QueryRunner;

  protected async beforeTransactionExecute(): Promise<void> {}

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(CreateAddressService.name);
  }

  async execute(params: CreateAddressParams) {
    const address = this.queryRunner.manager.create(Address, params);

    await this.queryRunner.manager.save(address);

    return address;
  }

  protected async onError(error: Error, params: CreateAddressParams): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error on address register', { params }, error);
  }
}
