import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity({ name: 'tb_addresses' })
export class Address {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  street: string;

  @Column({ type: 'varchar', length: 5 })
  number: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  complement?: string;

  @Column({ type: 'varchar', length: 20 })
  neighborhood: string;

  @Column({ name: 'city_id', type: 'uuid' })
  cityId: string;

  @Column({ type: 'char', length: 8 })
  zipCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuidv7();
  }
}
