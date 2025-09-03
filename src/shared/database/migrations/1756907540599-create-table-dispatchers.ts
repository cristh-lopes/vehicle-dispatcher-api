import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDispatchers1756907540599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_dispatchers" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "document" character varying NOT NULL,
        "signature_date" timestamp NOT NULL,
        "features" jsonb NULL,
        "plan_id" uuid NOT NULL,
        "address_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_tb_dispatchers_id" PRIMARY KEY ("id"),
	    CONSTRAINT "dispatchers_addresses_id_fkey" FOREIGN KEY (address_id) REFERENCES tb_addresses(id) ON DELETE CASCADE,
        CONSTRAINT "dispatchers_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES tb_plans(id) ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_plans"`);
  }
}
