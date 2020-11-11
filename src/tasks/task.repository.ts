import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { SelectQuery } from 'typeorm/query-builder/SelectQuery';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const query: SelectQueryBuilder<TaskEntity> = this.createQueryBuilder('task');

    if (filterDto.status)
      query.andWhere('task.status = :status', { status: filterDto.status });

    if (filterDto.search)
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: filterDto.search });

    const tasks: TaskEntity[] = await query.getMany();


    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task: TaskEntity = new TaskEntity();

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;

    return task.save();
  }
}