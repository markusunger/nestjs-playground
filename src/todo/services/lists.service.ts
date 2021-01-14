import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entities/list.entity';
import { CreateListDto } from '../dto/create-list.dto';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List) private listRepository: Repository<List>,
    ) {}

    getAll(): Promise<List[]> {
        return this.listRepository.find();
    }

    create(createListDto: CreateListDto): Promise<List> {
        return this.listRepository.save(createListDto);
    }
}
