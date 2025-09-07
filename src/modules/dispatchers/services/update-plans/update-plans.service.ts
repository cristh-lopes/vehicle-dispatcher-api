import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { Plan } from '@dispatchers/database/entities/plan.entity';
import { UpdatePlansParams, UptatePlansResult } from './update-plans.dto';

@Injectable()
export class UpdatePlansService extends TransactionHandler<UpdatePlansParams, UptatePlansResult> {
  protected queryRunner: QueryRunner;

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(UpdatePlansService.name);
  }

  protected async beforeTransactionExecute(): Promise<void> {}

  async execute({ id, ...data }: UpdatePlansParams) {
    const plan = await this.queryRunner.manager.findOne(Plan, { where: { id } });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    Object.assign(plan, data);

    await this.queryRunner.manager.save(plan);

    return plan;
  }

  protected async onError(error: Error): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error updating plan', error);
  }
}
