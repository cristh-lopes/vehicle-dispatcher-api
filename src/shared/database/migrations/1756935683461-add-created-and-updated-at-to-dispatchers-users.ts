import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAndUpdatedAtToDispatchersUsers1756935683461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_dispatchers_users
      ADD COLUMN created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();
    `);

    await queryRunner.query(`
      ALTER TABLE tb_dispatchers_users
      ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_dispatchers_users
      DROP COLUMN IF EXISTS updated_at;
    `);

    await queryRunner.query(`
      ALTER TABLE tb_dispatchers_users
      DROP COLUMN IF EXISTS created_at;
    `);
  }
}
