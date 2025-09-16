import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Obtener todas las tareas
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // Obtener una tarea por ID
  async findOne(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada.`);
    }
    return found;
  }

  // Crear una nueva tarea
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  // Actualizar una tarea
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    const updatedTask = Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(updatedTask);
  }

  // Eliminar una tarea
  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada.`);
    }
  }
}