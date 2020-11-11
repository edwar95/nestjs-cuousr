import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('VALUE: ', value);
    console.log('METADATA', metadata);
    value = value.toUpperCase();

    if(!this.isValidaStatus(value))
      throw new BadRequestException("invalid status")

    return value;
  }

  private isValidaStatus(value: any) {
    const index: number = this.allowedStatuses.indexOf(value);
    return index !== -1;
  }

}
