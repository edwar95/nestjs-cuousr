import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Controller('tasks')
export class TasksController {

  constructor(private _taskService: TasksService) {
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this._taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this._taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto):Promise<TaskEntity> {
    console.log(createTaskDto.title, createTaskDto.description);

    return this._taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this._taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id',ParseIntPipe) id: number, @Body("status",TaskStatusValidationPipe) status: TaskStatus): Promise<TaskEntity> {
    return this._taskService.updateTaskStatus(id, status);
  }
}