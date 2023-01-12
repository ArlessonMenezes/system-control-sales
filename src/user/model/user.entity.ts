import { hash, hashSync } from 'bcrypt';
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  BeforeInsert
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  name: string;

  @Column({ unique: true })
  register: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}