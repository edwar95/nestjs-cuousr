import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity("Student")
export class StudentEntity {

  @ObjectIdColumn()
  _id:string

  @PrimaryColumn()
  id:string;

  @Column()
  firstName:string;


  @Column()
  lastName:string;


}
