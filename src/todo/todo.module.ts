import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsController } from './controllers/lists.controller';
import { Item, List } from './entities';
import { ListsService } from './services/lists.service';

@Module({
    imports: [TypeOrmModule.forFeature([List, Item])],
    providers: [ListsService],
    controllers: [ListsController],
})
export class TodoModule {}
