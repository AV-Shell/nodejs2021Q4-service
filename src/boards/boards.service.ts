import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardsRepository.create(createBoardDto);
    return this.boardsRepository.save(board);
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException(
        `Board with ${id} cannot be found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    let board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException(`Board with ${id} cannot be found`, 404);
    }
    board = await this.boardsRepository.create({ ...board, ...updateBoardDto });
    return this.boardsRepository.save(board);
  }

  async delete(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException(`Board with ${id} cannot be found`, 404);
    }
    await this.boardsRepository.delete(id);
    return board;
  }
}
