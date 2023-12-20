import { Ordert } from 'src/modules/order/entity/order.entity';
import { 
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => Ordert, (order) => order.evaluation)
  order: Ordert;

  @Column()
  score: EvaluationScore;

  @Column()
  comment: string;

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
}
