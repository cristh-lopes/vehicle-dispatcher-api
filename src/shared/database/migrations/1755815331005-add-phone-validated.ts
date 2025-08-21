import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhoneValidated1755815331005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_users"
       ADD COLUMN "phone_validated" boolean NOT NULL DEFAULT false,
       ADD COLUMN "phone_validation_code" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_users"
       DROP COLUMN "phone_validation_code",
       DROP COLUMN "phone_validated"`,
    );
  }
}
