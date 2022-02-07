import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'User name' })
  @IsString({ message: 'must be srting' })
  readonly name: string;

  @ApiProperty({ example: 'Abramov', description: 'User soname' })
  @IsString({ message: 'must be srting' })
  readonly login: string;

  @ApiProperty({ example: 'AbraShvabra12!@', description: 'User password' })
  @IsString({ message: 'must be srting' })
  readonly password: string;
}
