import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDispatchersParams1756931043771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_dispatchers_params" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "type" character varying NOT NULL,
        "value" character varying NOT NULL,
        "dispatcher_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_dispatchers_params_dispatcher_id" FOREIGN KEY ("dispatcher_id") REFERENCES "tb_dispatchers"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "PK_tb_dispatchers_params_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_dispatchers_params"`);
  }
}
