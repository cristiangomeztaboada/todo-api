import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'El título de la tarea.',
    example: 'Comprar leche',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'El estado de la tarea (completada o no).',
    example: false,
    required: false,
  })
  @IsBoolean()
  completed?: boolean;
}