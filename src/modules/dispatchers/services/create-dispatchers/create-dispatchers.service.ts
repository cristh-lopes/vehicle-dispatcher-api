import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { CreateDispatcherParams, CreateDispatcherResult } from './create-dispatchers.dto';
import { Dispatcher } from '@dispatchers/database/entities/dispatcher.entity';

@Injectable()
export class CreateDispatcherService extends TransactionHandler<
  CreateDispatcherParams,
  CreateDispatcherResult
> {
  protected queryRunner: QueryRunner;

  protected async beforeTransactionExecute(): Promise<void> {}

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(CreateDispatcherService.name);
  }

  async execute(params: CreateDispatcherParams) {
    const dispatcher = this.queryRunner.manager.create(Dispatcher, params);

    await this.queryRunner.manager.save(dispatcher);

    return dispatcher;
  }

  protected async onError(error: Error, params: CreateDispatcherParams): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error on dispatcher register', { params }, error);
  }
}
