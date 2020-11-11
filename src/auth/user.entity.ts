import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type=> TaskEntity, task=> task.user,{eager: true})
  tasks: TaskEntity[]

  async validatePassword(password: string): Promise<boolean> {

    const hash: string = await bcrypt.hash(password, this.salt);
    console.log(this.salt)
    console.log(hash)
    console.log(this.password)
    return hash === this.password;
  }
}
