import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { LessonEntity } from '../lesson/lesson.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(StudentEntity) private _studentRepository: Repository<StudentEntity>,
  ) {

  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<StudentEntity> {

    const student:StudentEntity = this._studentRepository.create({
      id: uuid(),
      firstName: createStudentInput.firstName,
      lastName: createStudentInput.lastName,
    });

    return this._studentRepository.save(student)
  }

  async getAllStudents():Promise<StudentEntity[]>{
    return this._studentRepository.find()
  }

  async  getStudent(id:string):Promise<StudentEntity>{
    return this._studentRepository.findOne({id})
  }

  async getManyStudents(studentIds:string[]):Promise<StudentEntity[]>{
    return this._studentRepository.find({
      where:{
        id:{
          $in:studentIds
        }
      }
    })
  }
}
