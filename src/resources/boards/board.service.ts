import { IBoard } from '../../types/interfaces';
import * as boardsRepo from './board.memory.repository';

export const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

export const getById = (id: string): Promise<IBoard> => boardsRepo.getById(id);

export const create = (board: IBoard): Promise<IBoard> =>
  boardsRepo.create(board);

export const update = (board: Partial<IBoard>, id: string): Promise<IBoard> =>
  boardsRepo.update(board, id);

export const deleteById = (id: string): Promise<IBoard> =>
  boardsRepo.deleteById(id);
