import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from '../dto/create-list.dto';
import { List } from '../entities/list.entity';
import { List as ListInterface } from '../interfaces/list.interface';
import { ListsService } from './lists.service';

const sampleListA: ListInterface = {
    id: 1,
    name: 'A test list',
};

const sampleListB: ListInterface = {
    id: 2,
    name: 'Another test list',
};

const listArray: ListInterface[] = [sampleListA, sampleListB];

describe('ListsService', () => {
    let listsService: ListsService;
    let listRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ListsService,
                {
                    provide: getRepositoryToken(List),
                    useValue: {
                        find: jest.fn().mockResolvedValue(listArray),
                        save: jest.fn().mockImplementation(
                            (createListDto: CreateListDto) =>
                                new Promise((resolve) => {
                                    resolve({
                                        id: 1,
                                        ...createListDto,
                                    });
                                }),
                        ),
                    },
                },
            ],
        }).compile();

        listsService = moduleRef.get<ListsService>(ListsService);
        listRepository = moduleRef.get<Repository<List>>(
            getRepositoryToken(List),
        );
    });

    it('Should be defined', () => {
        expect(listsService).toBeDefined();
    });

    describe('getAll', () => {
        it('should get a list of lists', () => {
            expect(listsService.getAll()).resolves.toEqual(listArray);
        });
    });

    describe('create', () => {
        it('should create a new list', () => {
            const repositorySpy = jest.spyOn(listRepository, 'save');
            expect(
                listsService.create({ name: 'A test list' }),
            ).resolves.toMatchObject(sampleListA);
            expect(repositorySpy).toBeCalledWith({ name: 'A test list' });
        });
    });
});
