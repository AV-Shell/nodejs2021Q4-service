import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), forwardRef(() => LoginModule)],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
