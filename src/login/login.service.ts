import {
  HttpException,
  HttpStatus,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  private isHasAdmin = false;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    if (!this.isHasAdmin) {
      await this.registerAdmin();
    }
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registerAdmin() {
    this.isHasAdmin = true;
    const admin: CreateUserDto = {
      login: 'admin',
      password: 'admin',
      name: 'Maksim',
    };
    const user = await this.usersService.getUserByLogin(admin.login);
    if (user) {
      return;
    }
    await this.usersService.create(admin);
  }

  private async generateToken(user: User) {
    const payload = { userId: user.id, login: user.login };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user?.password ?? '',
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException(
      'Something wrong with login/password',
      HttpStatus.FORBIDDEN,
    );
  }
}
