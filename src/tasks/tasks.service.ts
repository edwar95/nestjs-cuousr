import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {
  }

  // private tasks: Task[] = [];
  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.tasks;
  //
  //   if (status){
  //     console.log("status",status)
  //     tasks = tasks.filter((task: Task) => task.status === status);
  //   }
  //
  //   if(search)
  //     tasks = tasks.filter((task:Task)=>
  //       task.title === search ||
  //       task.description === search
  //     )
  //
  //
  //   return tasks;
  // }
  //
  async getTasks(getTasksDto: GetTasksFilterDto): Promise<TaskEntity[]>{
    return this._taskRepository.getTasks(getTasksDto);
  }

  async getTaskById(id: number): Promise<TaskEntity> {

    console.log(this._taskRepository);

    const found: TaskEntity = await this._taskRepository.findOne(id);

    if (!found)
      throw new NotFoundException;

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

    return this._taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this._taskRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException;

    console.log(result);
  }

  async updateTaskStatus(id:number, status:TaskStatus):Promise<TaskEntity>{
    const task: TaskEntity = await this._taskRepository.findOne(id);
    if(!task)
      throw new NotFoundException;

    task.status = status;
    await task.save();

    return task
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

