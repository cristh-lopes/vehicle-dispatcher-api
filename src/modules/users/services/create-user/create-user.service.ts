import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { FirebaseAuthProvider } from '@shared/core/firebase';
import { AppLogger } from '@shared/core/logger';
import { TransactionHandler } from '@shared/core/transaction-handler';

import { User } from '@users/database/entities/user.entity';
import { CreateUserParams, CreateUserResult } from './create-user.dto';

@Injectable()
export class CreateUserService extends TransactionHandler<CreateUserParams, CreateUserResult> {
  protected queryRunner: QueryRunner;

  protected async beforeTransactionExecute(): Promise<void> {}

  constructor(
    dataSource: DataSource,
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly logger: AppLogger,
  ) {
    super(dataSource);
    this.logger.setContext(CreateUserService.name);
  }

  private generatePhoneValidationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async execute(params: CreateUserParams) {
    const userAlreadyExists = await this.queryRunner.manager.findOneBy(User, {
      email: params.email,
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const phoneValidationCode = this.generatePhoneValidationCode();

    const user = this.queryRunner.manager.create(User, {
      ...params,
      phoneValidationCode,
    });

    await this.queryRunner.manager.save(user);

    const firebaseUser = await this.firebaseAuthProvider.createUser({
      uid: user.id,
      email: params.email,
      password: params.password,
      displayName: params.name,
      phoneNumber: params.phone,
    });

    if (firebaseUser.isFailure()) {
      throw firebaseUser.value;
    }

    this.logger.log('User created', { id: user.id, email: params.email, phone: params.phone });

    return user;
  }

  protected async onError(error: Error, params: CreateUserParams): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.logger.error('Error on user register', { params }, error);
  }
}
