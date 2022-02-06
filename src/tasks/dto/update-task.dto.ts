import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly order?: number;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly description?: string;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly userId?: string | null;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly boardId?: string | null;

  @IsOptional()
  @IsString({ message: 'must be srting' })
  readonly columnId?: string | null;
}
