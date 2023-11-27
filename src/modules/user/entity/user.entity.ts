import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Sheet } from '../../sheet/entity/sheet.entity';
import { Answer } from '../../answer/entity/answer.entity';
import { Firm } from './firm.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  FORWARDER = 'forwarder',
  ADMINISTRATOR = 'administrator',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne((type) => Firm, (firm) => firm.employees)
  firm: Firm;

  @OneToMany((type) => Answer, (answer) => answer.forwarder)
  answers: Answer[];

  @OneToMany((type) => Sheet, (sheet) => sheet.customer)
  sheets: Sheet[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date | undefined;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date | undefined;
}
