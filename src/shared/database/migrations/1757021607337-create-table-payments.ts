import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePayments1757021607337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_payments" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "note" character varying NULL,
        "amount" numeric(10,2) NOT NULL,
        "payment_date" TIMESTAMP NOT NULL DEFAULT now(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_tb_payments_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_payments"`);
  }
}
