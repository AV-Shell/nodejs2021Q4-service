import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'User name' })
  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly name?: string;

  @ApiProperty({ example: 'Abramov', description: 'User soname' })
  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly login?: string;

  @ApiProperty({ example: 'AbraShvabra12!@', description: 'User password' })
  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly password?: string;
}
