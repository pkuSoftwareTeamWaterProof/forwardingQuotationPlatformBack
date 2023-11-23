import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Answer } from '../../answer/entity/answer.entity';
import { Customer } from '../../user/user.entity';

@Entity()
export class Sheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startpoint: string;

  @Column()
  endpoint: string;

  @Column()
  weight: number;

  @Column()
  size: number;

  @Column()
  species: string;

  @Column()
  type_of_shipping: string;

  @Column()
  remark: string;

  @Column()
  startdate: string;

  @Column()
  enddate: string;

  @OneToMany(() => Answer, (answer) => answer.sheet)
  answer: Answer[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'CreateDate',
  })
  createdAt: Date | undefined;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'UpdateDate',
  })
  updatedAt: Date | undefined;

  @ManyToOne((type) => Customer, (customer) => customer.sheets)
  customer: Customer;

  @Column()
  live: boolean;
}
