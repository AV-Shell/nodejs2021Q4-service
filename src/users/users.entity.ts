import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ResponceUserDto } from './dto/responce-user.dto';

@Entity()
export class User {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'User id',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Ivan', description: 'User name' })
  @Column({
    type: 'varchar',
    default: 'Ivan',
  })
  name!: string;

  @ApiProperty({ example: 'Abramov', description: 'User soname' })
  @Column({
    type: 'varchar',
    default: 'Ivanko',
  })
  login!: string;

  @ApiProperty({ example: 'AbraShvabra12!@', description: 'User password' })
  @Column({
    type: 'varchar',
    default: 'password',
  })
  password!: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];

  static toResponse(user: User): ResponceUserDto {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
