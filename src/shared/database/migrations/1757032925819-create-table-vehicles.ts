import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVehicles1757032925819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_vehicles" (
        "id" uuid NOT NULL,
        "plate" character varying NULL,
        "renavam" character varying NOT NULL,
        "chassi" character varying NOT NULL,
        "model" character varying NULL,
        "year" character varying NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_tb_vehicles_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_vehicles"`);
  }
}
