import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Sheet } from '../../sheet/entity/sheet.entity';
import { Answer } from '../../answer/entity/answer.entity';
import { Evaluation } from 'src/modules/evaluation/entity/evaluation.entity';
@Entity()
export class Ordert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  context: string;

  @OneToOne(() => Sheet)
  @JoinColumn()
  sheet: Sheet;

  @OneToOne(() => Answer)
  @JoinColumn()
  answer: Answer;

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

  @OneToOne((type) => Evaluation, (evaluation) => evaluation.order)
  evaluation: Evaluation | null;
}
