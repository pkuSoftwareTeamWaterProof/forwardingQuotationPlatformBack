import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { Answer } from '../../answer/entity/answer.entity';
import { User } from '../../user/entity/user.entity';
import { Ordert } from 'src/modules/order/entity/order.entity';

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

  @OneToOne(() => Ordert, (order) => order.sheet)
  ordert: Ordert | null;

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

  /*@DeleteDateColumn({
    type: 'timestamp',
    name: 'DeleteDate',
  })
  deletedAt: Date | undefined;*/

  @ManyToOne((type) => User, (user) => user.sheets)
  customer: User;
}
