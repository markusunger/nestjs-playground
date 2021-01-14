import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { List } from '../interfaces/list.interface';
import { ListsService } from '../services/lists.service';

@Controller('lists')
export class ListsController {
    constructor(private listsService: ListsService) {}

    @Get()
    async getAllLists(): Promise<List[]> {
        return this.listsService.getAll();
    }

    @Post()
    async createList(@Body() createListDto: CreateListDto): Promise<void> {
        await this.listsService.create(createListDto);
    }
}
