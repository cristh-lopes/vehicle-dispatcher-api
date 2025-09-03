import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlans1756903552864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_plans" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "price" numeric(10, 2) NOT NULL,
	    "max_users" int4 NULL,
        "features" jsonb NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_tb_plans_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_plans"`);
  }
}
