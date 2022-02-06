import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponceUserDto } from './dto/responce-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ResponceUserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => User.toResponse(user));
  }

  async findOne(id: string): Promise<ResponceUserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return User.toResponse(user);
  }

  async create(dto: CreateUserDto): Promise<ResponceUserDto> {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    let user = await this.usersRepository.create({
      ...dto,
      password: hashPassword,
    });
    user = await this.usersRepository.save(user);
    const userToResponce = User.toResponse(user);
    return userToResponce;
  }

  async update(
    id: string,
    dto: Partial<CreateUserDto>,
  ): Promise<ResponceUserDto> {
    let user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (dto.password) {
      const hashPassword = await bcrypt.hash(dto.password, 10);
      user = await this.usersRepository.create({
        ...user,
        ...dto,
        password: hashPassword,
      });
    } else {
      user = await this.usersRepository.create({ ...user, ...dto });
    }
    user = await this.usersRepository.save(user);
    const userToResponce = User.toResponse(user);
    return userToResponce;
  }

  async deleteById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException(`The user with id ${id} was not found`, 404);
    }
    await this.usersRepository.delete(id);
    return user;
  }

  async getUserByLogin(login: string) {
    return this.usersRepository.findOne({ where: { login: login } });
  }
}
