import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'must be srting' })
  readonly title: string;

  @IsNumber()
  readonly order: number;

  @IsString({ message: 'must be srting' })
  readonly description: string;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly userId: string | null;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly boardId: string | null;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly columnId: string | null;
}
