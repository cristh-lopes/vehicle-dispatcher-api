import { District } from '@districts/database/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity({ name: 'tb_cities' })
export class City {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'char', length: 2 })
  state: string;

  @ManyToMany(() => District, (district) => district.cities)
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
