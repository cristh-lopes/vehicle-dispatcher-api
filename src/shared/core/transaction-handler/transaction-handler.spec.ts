import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, QueryRunner } from 'typeorm';

import { TransactionHandler } from './transaction-handler';

class TestTransactionHandler extends TransactionHandler<number, string> {
  async execute(params: number): Promise<string> {
    if (params < 0) throw new Error('Invalid value');
    await new Promise((resolve) => setTimeout(resolve, 0));
    return `${params}`;
  }

  protected async beforeTransactionExecute(): Promise<void> {}

  protected async onError(): Promise<void> {}
}

describe('TransactionHandler', () => {
  let sut: TestTransactionHandler;

  const queryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: { query: jest.fn() },
  } as unknown as QueryRunner;

  const dataSource = {
    createQueryRunner: jest.fn().mockReturnValue(queryRunner),
  } as unknown as DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DataSource,
          useValue: dataSource,
        },
        {
          provide: TestTransactionHandler,
          useFactory: () => new TestTransactionHandler(dataSource),
        },
      ],
    }).compile();

    sut = await module.resolve<TestTransactionHandler>(TestTransactionHandler);
  });

  test('should commit transaction successfully with internal QueryRunner', async () => {
    const executeSpy = jest.spyOn(sut, 'execute');
    const beforeTransactionExecuteSpy = jest.spyOn(sut as never, 'beforeTransactionExecute');
    const onErrorSpy = jest.spyOn(sut as never, 'onError');

    const result = await sut.executeWithTransaction(10);

    expect(queryRunner['connect']).toHaveBeenCalled();
    expect(queryRunner['startTransaction']).toHaveBeenCalledWith('READ COMMITTED');
    expect(beforeTransactionExecuteSpy).toHaveBeenCalled();
    expect(executeSpy).toHaveBeenCalledWith(10);
    expect(queryRunner['commitTransaction']).toHaveBeenCalled();
    expect(queryRunner['release']).toHaveBeenCalled();
    expect(onErrorSpy).not.toHaveBeenCalled();
    expect(result).toBe('10');
  });

  test('should rollback transaction on error', async () => {
    const executeSpy = jest.spyOn(sut as never, 'execute');
    const beforeTransactionExecuteSpy = jest.spyOn(sut as never, 'beforeTransactionExecute');
    const onErrorSpy = jest.spyOn(sut as never, 'onError');

    await expect(sut.executeWithTransaction(-1)).rejects.toThrow('Invalid value');

    expect(queryRunner['startTransaction']).toHaveBeenCalled();
    expect(beforeTransactionExecuteSpy).toHaveBeenCalled();
    expect(executeSpy).toHaveBeenCalledWith(-1);
    expect(queryRunner['rollbackTransaction']).toHaveBeenCalled();
    expect(onErrorSpy).toHaveBeenCalled();
    expect(queryRunner['release']).toHaveBeenCalled();
  });

  test('should use external QueryRunner if provided', async () => {
    sut.setQueryRunner(queryRunner);
    const result = await sut.executeWithTransaction(20);

    expect(queryRunner['connect']).not.toHaveBeenCalled();
    expect(queryRunner['startTransaction']).not.toHaveBeenCalled();
    expect(queryRunner['commitTransaction']).not.toHaveBeenCalled();
    expect(queryRunner['release']).not.toHaveBeenCalled();
    expect(result).toBe('20');
  });
});
