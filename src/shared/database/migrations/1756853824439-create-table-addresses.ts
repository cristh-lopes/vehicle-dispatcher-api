import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddresses1756853824439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_addresses" (
        "id" uuid NOT NULL,
        "street" character varying NOT NULL,
        "number" character varying,
        "neighborhood" character varying,
        "zip_code" character varying,
        "complement" character varying,
        "city_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_tb_addresses_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_tb_addresses_city_id" FOREIGN KEY ("city_id") REFERENCES "tb_cities"("id") ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_addresses"`);
  }
}
