import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Dispatcher } from './dispatcher.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'tb_plans' })
export class Plan {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', name: 'max_users' })
  @IsOptional()
  maxUsers?: number;

  @OneToMany('tb_dispatchers', (dispatcher: Dispatcher) => dispatcher.plan)
  dispatchers: Dispatcher[];

  @Column({ type: 'jsonb', nullable: true })
  @IsOptional()
  features?: string[];

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
