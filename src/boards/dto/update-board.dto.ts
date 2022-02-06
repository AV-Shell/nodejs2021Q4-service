import { IColumn } from 'src/common/Column';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsArray()
  readonly columns?: IColumn[];
}
