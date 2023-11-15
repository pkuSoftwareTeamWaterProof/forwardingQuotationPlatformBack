import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

@Entity()
export class Firm{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description:string|null;

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

  @OneToMany(type => Forwarder, forwarder => forwarder.firm)
  employees: Forwarder[];
}

export enum UserRole{
  CUSTOMER = "customer",
  FORWARDER = "forwarder",
  ADMINISTRATOR = "administrator"
}

export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

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

@Entity()
export class Customer extends User {
  @Column({nullable:true})
  telephone: string

  @Column({nullable:true})
  email: string
  
}

@Entity()
export class Forwarder extends User {
  @Column({nullable:true})
  telephone: string;

  @Column({nullable:true})
  email: string;

  @ManyToOne(type=>Firm, firm=>firm.employees)
  firm:Firm;
}

@Entity()
export class Administrator extends User {

}