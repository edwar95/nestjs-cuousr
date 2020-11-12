import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { Inject } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from '../student/assign-students-to-lesson.input';
import { LessonEntity } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {

  constructor(
    @Inject(LessonService) private _lessonService: LessonService,
    @Inject(StudentService) private _studentService: StudentService,
  ) {
  }

  @Query(returns => LessonType)
  async lesson(
    @Args('id') id: string,
  ): Promise<LessonType> {
    return this._lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  async lessons(): Promise<LessonType[]> {
    return this._lessonService.getAllLessons();
  }

  @Mutation(returns => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: LessonInput,
  ): Promise<LessonType> {
    return await this._lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  async assignStudentToLesson(
    @Args("assignStudentToLessonsInput") assignStudentToLessonsInput:AssignStudentsToLessonInput
  ){
    return this._lessonService.assignStudentsLesson(assignStudentToLessonsInput)
  }

  @ResolveField()
  async students(@Parent() lesson:LessonEntity){
    return this._studentService.getManyStudents(lesson.students)
  }


}
