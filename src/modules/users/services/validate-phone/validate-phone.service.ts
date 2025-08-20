import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { User } from '@users/database/entities/user.entity';

import { ValidatePhoneParams, ValidatePhoneResult } from './validate-phone.dto';

@Injectable()
export class ValidatePhoneService extends TransactionHandler<
  ValidatePhoneParams,
  ValidatePhoneResult
> {
  protected queryRunner: QueryRunner;

  protected async beforeTransactionExecute(): Promise<void> {}

  constructor(
    dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(ValidatePhoneService.name);
  }

  async execute(params: ValidatePhoneParams) {
    const user = await this.queryRunner.manager.findOneBy(User, {
      phone: params.phone,
      phoneValidationCode: params.validationCode,
    });

    if (!user) {
      throw new BadRequestException('Invalid code');
    }

    if (user.phoneValidated) {
      throw new BadRequestException('Phone already validated');
    }

    await this.queryRunner.manager.update(User, { id: user.id }, { phoneValidated: true });

    return { message: 'Phone validated successfully' };
  }

  protected async onError(error: Error, params: ValidatePhoneParams): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error on phone validation', { params }, error);
  }
}
