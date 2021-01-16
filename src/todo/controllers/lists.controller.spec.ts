import { Test } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from '../services/lists.service';
import { CreateListDto } from '../dto/create-list.dto';

describe('ListsController', () => {
    let listsController: ListsController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ListsController],
            providers: [
                {
                    provide: ListsService,
                    useValue: {
                        getAll: jest.fn().mockResolvedValue([
                            {
                                id: 1,
                                name: 'A test list',
                            },
                        ]),
                        create: jest
                            .fn()
                            .mockImplementation(
                                (createListDto: CreateListDto) => ({
                                    id: 42,
                                    ...createListDto,
                                }),
                            ),
                    },
                },
            ],
        }).compile();

        listsController = moduleRef.get<ListsController>(ListsController);
    });

    it('should be defined', () => {
        expect(listsController).toBeDefined();
    });

    describe('getAllLists', () => {
        it('should retrieve an array of lists', async () => {
            expect(await listsController.getAllLists()).toMatchObject([
                { id: 1, name: 'A test list' },
            ]);
        });
    });

    describe('createList', () => {
        it('should create a new list when supplied with a proper request body', async () => {
            expect(
                listsController.createList({ name: 'A test list' }),
            ).resolves.toEqual({
                id: 42,
                name: 'A test list',
            });
        });
    });

    afterAll(() => {
        jest.resetAllMocks();
    });
});
