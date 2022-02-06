import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.create({
      ...createTaskDto,
      boardId,
    });
    return this.tasksRepository.save(task);
  }

  findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { boardId: boardId } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new HttpException(
        `Task with ${id} cannot be found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new HttpException(`Task with ${id} cannot be found`, 404);
    }
    task = await this.tasksRepository.create({ ...task, ...updateTaskDto });
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new HttpException(`Task with ${id} cannot be found`, 404);
    }
    await this.tasksRepository.delete(id);
    return task;
  }
}
