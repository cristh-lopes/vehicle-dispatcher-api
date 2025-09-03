import { Address } from '@addresses/database/entities/address.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Plan } from './plan.entity';

@Entity({ name: 'tb_dispatchers' })
export class Dispatcher {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp', name: 'signature_date' })
  signatureDate: Date;

  @Column({ type: 'varchar' })
  document: string;

  @OneToOne('tb_addresses')
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToOne('tb_plans')
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

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
