// src/tasks/dto/task.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}