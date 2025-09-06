import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { CreatePlansParams, CreatePlansResult } from './create-plans.dto';
import { Plan } from '@dispatchers/database/entities/plan.entity';

@Injectable()
export class CreatePlansService extends TransactionHandler<CreatePlansParams, CreatePlansResult> {
  protected queryRunner: QueryRunner;

  protected async beforeTransactionExecute(): Promise<void> {}

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(CreatePlansService.name);
  }

  async execute(plans: CreatePlansParams) {
    const plansCreate = this.queryRunner.manager.create(Plan, plans);

    await this.queryRunner.manager.save(plansCreate);

    return plansCreate;
  }

  protected async onError(error: Error, plans: CreatePlansParams): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error on plans register', { plans }, error);
  }
}
