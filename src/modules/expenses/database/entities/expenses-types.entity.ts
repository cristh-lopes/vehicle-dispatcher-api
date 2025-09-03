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
import { Expenses } from './expenses.entity';

@Entity({ name: 'tb_expenses_types' })
export class ExpensesTypes {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  color: string;

  @OneToMany('tb_expenses', (expense: Expenses) => expense.expenseType)
  expenses: Expenses[];

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
