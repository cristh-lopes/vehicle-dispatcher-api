import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity({ name: 'tb_cities' })
export class City {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'char', length: 2 })
  state: string;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuidv7();
  }
}
