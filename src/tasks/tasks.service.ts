import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {
  }

  async getTasks(
    getTasksDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this._taskRepository.getTasks(getTasksDto, user);
  }

  async getTaskById(
    id: number,
    user: UserEntity,
  ): Promise<TaskEntity> {

    console.log(this._taskRepository);

    const found: TaskEntity = await this._taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!found)
      throw new NotFoundException;

    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {

    return this._taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(
    id: number,
    user:UserEntity
  ): Promise<void> {
    const result = await this._taskRepository.delete({
      id,
      userId: user.id
    });

    if (result.affected === 0)
      throw new NotFoundException;

    console.log(result);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task: TaskEntity = await this._taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!task)
      throw new NotFoundException;

    task.status = status;
    await task.save();

    return task;
  }

  // getTaskById(id: string): Task {
  //   const found: Task = this.tasks.find((task: Task) => task.id === id);
  //
  //   if(!found)
  //     throw new NotFoundException
  //
  //   return found
  // }
  //
  // createTask(cretaeTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     title: cretaeTaskDto.title,
  //     description: cretaeTaskDto.description,
  //     status: TaskStatus.OPEN,
  //     id: uuid.v1(),
  //   };
  //
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // deleteTask(id: string): Task {
  //   const found: Task = this.getTaskById(id);
  //
  //   this.tasks = this.tasks.filter((task: Task) => task.id !== found.id);
  //
  //   return found;
  // }
  //
  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task: Task = this.tasks.find((task: Task) => task.id === id);
  //   task.status = status;
  //
  //   const index: number = this.tasks.findIndex((task: Task) => task.id === id);
  //
  //   this.tasks[index] = task;
  //
  //   return task;
  // }

}

