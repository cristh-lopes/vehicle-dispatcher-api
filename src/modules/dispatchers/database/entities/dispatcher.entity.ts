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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Plan } from './plan.entity';
import { District } from '@districts/database/entities/district.entity';

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

  @Column({ name: 'address_id', type: 'uuid' })
  addressId: string;

  @OneToOne('tb_addresses')
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'plan_id', type: 'uuid' })
  planId: string;

  @ManyToOne('tb_plans')
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @ManyToMany(() => District, (district) => district.dispatchers)
  @JoinTable({
    name: 'tb_dispatchers_districts',
    joinColumn: { name: 'dispatcher_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'district_id', referencedColumnName: 'id' },
  })
  districts: District[];

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
