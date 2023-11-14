import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';

  import { Sheet } from '../../sheet/entity/sheet.entity';
  @Entity()
  export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    price: number;

    @Column()
    remark: string;

    
    @ManyToOne(() => Sheet, (sheet) => sheet.answer)
    sheets: Sheet
  
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
  