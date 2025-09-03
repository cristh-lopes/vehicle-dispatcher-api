import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

import { Dispatcher } from '@dispatchers/database/entities/dispatcher.entity';
import { User } from '@users/database/entities/user.entity';
import { UserRole } from '@users/enums/user-role.enum';

@Entity({ name: 'tb_dispatchers_user' })
export class DispatcherUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'jsonb', nullable: true })
  permitions?: string[];

  @ManyToOne('tb_dispatchers')
  @JoinColumn({ name: 'dispatcher_id' })
  dispatcher: Dispatcher;

  @ManyToOne('tb_users')
  @JoinColumn({ name: 'user_id' })
  user: User;

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
