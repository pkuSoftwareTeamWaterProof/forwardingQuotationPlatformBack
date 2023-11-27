import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Sheet } from '../../sheet/entity/sheet.entity';
import { User } from 'src/modules/user/entity/user.entity';
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

  @ManyToOne((type) => User, (user) => user.answers)
  forwarder: User;
}
