import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las tareas',
    description: 'Devuelve una lista completa de todas las tareas existentes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas obtenida con éxito.',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'La tarea ha sido creada con éxito.',
    type: Task,
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({
    status: 200,
    description: 'Tarea encontrada y devuelta con éxito.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'La tarea ha sido actualizada con éxito.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(parseInt(id, 10), updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({
    status: 200,
    description: 'La tarea ha sido eliminada con éxito.',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(parseInt(id, 10));
  }
}