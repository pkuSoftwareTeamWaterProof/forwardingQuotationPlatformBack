import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Sheet } from '../../sheet/entity/sheet.entity';
import { Forwarder } from 'src/modules/user/user.entity';
@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

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

  @ManyToOne((type) => Forwarder, (forwarder) => forwarder.answers)
  forwarder: Forwarder;
}
