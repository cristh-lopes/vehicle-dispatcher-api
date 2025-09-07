// src/modules/dispatchers/services/delete-plans.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { Plan } from '@dispatchers/database/entities/plan.entity';

@Injectable()
export class DeletePlansService extends TransactionHandler<string, void> {
  protected queryRunner: QueryRunner;

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(DeletePlansService.name);
  }

  protected async beforeTransactionExecute(): Promise<void> {}

  async execute(id: string) {
    const plan = await this.queryRunner.manager.findOne(Plan, { where: { id } });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    await this.queryRunner.manager.softRemove(plan);
  }

  protected async onError(error: Error, id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error deleting plan', { id }, error);
  }
}
