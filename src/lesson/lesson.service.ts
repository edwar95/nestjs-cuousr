import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from '../student/assign-students-to-lesson.input';

@Injectable()
export class LessonService {

  constructor(
    @InjectRepository(LessonEntity) private _lessonRepository: Repository<LessonEntity>,
  ) {
  }

  async getLesson(id: string): Promise<LessonEntity> {
    console.log(id);
    return this._lessonRepository.findOne({ id });
  }

  async getAllLessons(): Promise<LessonEntity[]> {
    return this._lessonRepository.find();
  }

  async createLesson(
    createLessonInput: LessonInput,
  ): Promise<LessonEntity> {

    const lesson: LessonEntity = this._lessonRepository.create({
      name: createLessonInput.name,
      endDate: createLessonInput.endDate,
      startDate: createLessonInput.startDate,
      id: uuid(),
      students:createLessonInput.students
    });

    return this._lessonRepository.save(lesson);

  }

  async assignStudentsLesson(
    assignStudentToLessonsInput:AssignStudentsToLessonInput,
  ): Promise<LessonEntity> {

    const lesson: LessonEntity = await this._lessonRepository.findOne({ id:assignStudentToLessonsInput.lessonId });

    lesson.students = [...lesson.students,...assignStudentToLessonsInput.studentIds]

    return this._lessonRepository.save(lesson);
  }
}
