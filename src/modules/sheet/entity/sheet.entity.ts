import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';
  
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
  