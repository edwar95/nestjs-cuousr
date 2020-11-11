import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32770,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [TaskEntity,UserEntity],
      synchronize: true,
      ssl: false,
    }),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
}
