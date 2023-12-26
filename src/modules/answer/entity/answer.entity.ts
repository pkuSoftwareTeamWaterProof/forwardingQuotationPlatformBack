import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { Sheet } from '../../sheet/entity/sheet.entity';
import { User } from '../../user/entity/user.entity';
import { Ordert } from 'src/modules/order/entity/order.entity';
@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  remark: string;

  @ManyToOne(() => Sheet, (sheet) => sheet.answer)
  sheet: Sheet;

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

  @ManyToOne((type) => User, (user) => user.answers)
  forwarder: User;

  @OneToOne((type) => Ordert, (order) => order.answer)
  ordert: Ordert | null;
}
