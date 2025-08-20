import { DataSource, QueryRunner } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export abstract class TransactionHandler<Params, Result> {
  protected queryRunner?: QueryRunner;
  private isolationLevel: IsolationLevel = 'READ COMMITTED';

  constructor(private readonly dataSource: DataSource) {}

  setQueryRunner(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
  }

  setIsolationLevel(isolationLevel: IsolationLevel) {
    this.isolationLevel = isolationLevel;
  }

  /**
   * Main method of the class.
   * Must be implemented by the child class.
   */
  protected abstract execute(params: Params): Promise<Result>;

  /**
   * This method is called before the execution of the main method.
   * It can be implemented by child classes.
   *
   * Tip: If your class uses other classes that also use transactions,
   * you can use this method to prepare the environment by passing
   * the query runner to the other classes (call setQueryRunner method of the class to do this)
   */
  protected abstract beforeTransactionExecute(): Promise<void>;

  async executeWithTransaction(params: Params): Promise<Result> {
    if (this.queryRunner) {
      return this.execute(params);
    }

    this.queryRunner = this.dataSource.createQueryRunner();

    await this.queryRunner.connect();
    await this.queryRunner.startTransaction(this.isolationLevel);

    try {
      await this.beforeTransactionExecute();
      const response = await this.execute(params);

      await this.queryRunner.commitTransaction();

      return response;
    } catch (error) {
      await this.queryRunner.rollbackTransaction();

      if (error instanceof Error) await this.onError(error, params);

      throw error;
    } finally {
      await this.queryRunner.release();

      this.queryRunner = undefined;
    }
  }

  protected abstract onError(error: Error, params: Params): Promise<void>;
}
