import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { StudentEntity } from './student/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mongodb",
      url:"mongodb://localhost:32771/school",
      synchronize:true,
      useUnifiedTopology:true,
      entities:[
        LessonEntity,
        StudentEntity
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:true
    }),
    LessonModule,
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
