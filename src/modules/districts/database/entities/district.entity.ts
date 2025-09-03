import { City } from '@addresses/database/entities/city.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v7 as uuidv7 } from 'uuid';

@Entity({ name: 'tb_districts' })
export class District {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @ManyToMany(() => City, (city) => city.districts)
  @JoinTable({
    name: 'tb_districts_cities',
    joinColumn: { name: 'district_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'city_id', referencedColumnName: 'id' },
  })
  cities: City[];

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
