import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDispatchersDistricts1756922232318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tb_dispatchers_districts" (
        "dispatcher_id" uuid NOT NULL,
        "district_id" uuid NOT NULL,
        CONSTRAINT "PK_tb_dispatchers_districts" PRIMARY KEY ("dispatcher_id", "district_id"),
        CONSTRAINT "FK_dispatcher_id" FOREIGN KEY ("dispatcher_id") REFERENCES "tb_dispatchers"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_district_id" FOREIGN KEY ("district_id") REFERENCES "tb_districts"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_dispatchers_districts"`);
  }
}
