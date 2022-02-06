import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/login/jwt-login.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponceUserDto } from './dto/responce-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [ResponceUserDto] })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, type: [User] })
  async getById(@Param() id: string): Promise<ResponceUserDto> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param() id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(id, userDto);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param() id: string) {
    return this.usersService.deleteById(id);
  }
}
