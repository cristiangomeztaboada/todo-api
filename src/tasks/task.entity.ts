import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({
    description: 'El ID único de la tarea.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'El título de la tarea.',
    example: 'Comprar leche',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'El estado de la tarea (completada o no).',
    example: false,
  })
  @Column({ default: false })
  completed: boolean;
}