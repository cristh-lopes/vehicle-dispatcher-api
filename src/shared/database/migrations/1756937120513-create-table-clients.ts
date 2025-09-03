import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableClients1756937120513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_clients" (
        "id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "document_number" character varying NOT NULL,
        "address_id" uuid NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
	    CONSTRAINT "clients_addresses_id_fkey" FOREIGN KEY (address_id) REFERENCES tb_addresses(id) ON DELETE CASCADE,
        CONSTRAINT "PK_tb_clients_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_clients"`);
  }
}
