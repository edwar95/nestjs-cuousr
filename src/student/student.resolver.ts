import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { LessonType } from '../lesson/lesson.type';

@Resolver(of=>StudentType)
export class StudentResolver {

  constructor(
    @Inject(StudentService) private _studentService: StudentService
  ) {
  }

  @Mutation(returns => StudentType)
  async createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput
  ): Promise<StudentType> {
    return await this._studentService.createStudent(createStudentInput)
  }

  @Query(returns => [StudentType])
  async students():Promise<StudentType[]>{
    return this._studentService.getAllStudents()
  }

  @Query(returns => StudentType)
  async student(
    @Args("id") id:string
  ):Promise<StudentType>{
    return this._studentService.getStudent(id)
  }
}
