import { IColumn } from 'src/common/Column';

export class CreateBoardDto {
  readonly title: string;
  readonly columns: IColumn[];
}
