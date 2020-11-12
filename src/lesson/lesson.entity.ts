import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { StudentEntity } from '../student/student.entity';

@Entity("Lesson")
export class LessonEntity {

  @ObjectIdColumn()
  _id:string

  @PrimaryColumn()
  id:string;

  @Column()
  name:string;

  @Column()
  startDate:string;

  @Column()
  endDate: string

  @Column()
  students: string[]
}
