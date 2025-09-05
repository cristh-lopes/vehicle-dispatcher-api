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

@Entity({ name: 'tb_vehicles' })
export class Vehicles {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  plate?: string;

  @Column({ type: 'varchar' })
  renavam: string;

  @Column({ type: 'varchar' })
  chassi: string;

  @Column({ type: 'varchar', nullable: true })
  model?: string;

  @Column({ type: 'varchar', nullable: true })
  year?: string;

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
