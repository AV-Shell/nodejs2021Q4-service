import { getRepository } from 'typeorm';
import { Board } from '../../entity/Board';
import { MyCustomError } from '../../common/myCustomError';

export const getAll = async (): Promise<Board[]> => {
  const boardTypeormRepo = getRepository(Board);
  return boardTypeormRepo.find();
};

export const getById = async (id: string): Promise<Board> => {
  const boardTypeormRepo = getRepository(Board);
  const board = await boardTypeormRepo.findOne(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, 404);
  }
  return board;
};

export const create = async (board: Board): Promise<Board> => {
  const boardTypeormRepo = getRepository(Board);
  const newBoard = await boardTypeormRepo.create(board);
  return boardTypeormRepo.save(newBoard);
};

export const update = async (
  boardData: Partial<Board>,
  id: string
): Promise<Board> => {
  const boardTypeormRepo = getRepository(Board);
  const board = await boardTypeormRepo.findOne(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, 404);
  }
  boardData.id = id;
  return boardTypeormRepo.save({ ...board, ...boardData });
};

export const deleteById = async (id: string): Promise<Board> => {
  const boardTypeormRepo = getRepository(Board);
  const board = await boardTypeormRepo.findOne(id);
  if (!board) {
    throw new MyCustomError(`The board with id ${id} was not found`, 404);
  }
  await boardTypeormRepo.delete(id);
  return board;
};
