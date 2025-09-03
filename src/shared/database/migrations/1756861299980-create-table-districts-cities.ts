import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDistrictsCities1756861299980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_districts_cities" (
        "district_id" uuid NOT NULL,
        "city_id" uuid NOT NULL,
        CONSTRAINT "PK_tb_districts_cities" PRIMARY KEY ("district_id", "city_id"),
        CONSTRAINT "FK_district" FOREIGN KEY ("district_id") REFERENCES "tb_districts"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_city" FOREIGN KEY ("city_id") REFERENCES "tb_cities"("id") ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_districts_cities"`);
  }
}
