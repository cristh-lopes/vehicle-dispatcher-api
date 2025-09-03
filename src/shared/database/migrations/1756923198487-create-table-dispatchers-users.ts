import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDispatchersUsers1756923198487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação do ENUM user_role
    await queryRunner.query(`CREATE TYPE "user_role" AS ENUM ( 'OWNER', 'EMPLOYEE');`);
    await queryRunner.query(`
      CREATE TABLE "tb_dispatchers_users" (
        "id" uuid NOT NULL,
        "dispatcher_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "role" "user_role" NOT NULL,
        "permitions" jsonb NULL,
        "deleted_at" TIMESTAMP NULL,
        CONSTRAINT "PK_dispatchers_user" PRIMARY KEY ("id"),
        CONSTRAINT "FK_dispatchers_user_dispatcher_id" FOREIGN KEY ("dispatcher_id") REFERENCES "tb_dispatchers"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_dispatchers_user_user_id" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dispatchers_user";`);
    await queryRunner.query(`DROP TYPE "user_role";`);
  }
}
