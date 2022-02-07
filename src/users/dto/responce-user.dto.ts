import { ApiProperty } from '@nestjs/swagger';

export class ResponceUserDto {
  @ApiProperty({ example: 'Ivan', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: 'Abramov', description: 'User soname' })
  readonly login: string;

  @ApiProperty({
    example: '29e1699d-6ec9-4432-b4a6-12036be64095',
    description: 'User Id',
  })
  readonly id: string;
}
