import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableExpenses1756940607838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_expenses" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "color" character varying NOT NULL,
        "expenses_types_id" uuid NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
	    CONSTRAINT "expenses_types_id_fkey" FOREIGN KEY (expenses_types_id) REFERENCES tb_expenses_types(id) ON DELETE CASCADE,
        CONSTRAINT "PK_tb_expenses_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_expenses"`);
  }
}
