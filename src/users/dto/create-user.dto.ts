import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: 'Abramov', description: 'User soname' })
  readonly login: string;

  @ApiProperty({ example: 'AbraShvabra12!@', description: 'User password' })
  readonly password: string;
}
