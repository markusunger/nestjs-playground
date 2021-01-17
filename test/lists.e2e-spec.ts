import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from 'src/todo/todo.module';
import { List } from 'src/todo/interfaces';
import { ListsService } from 'src/todo/services/lists.service';
import { CreateListDto } from 'src/todo/dto/create-list.dto';

const sampleListA: List = {
    id: 1,
    name: 'A sample list',
};

const sampleListB = {
    id: 2,
    name: 'Another sample list',
};

const sampleListArray = [sampleListA, sampleListB];

const listsService = {
    getAll: () => sampleListArray,
    create: (createListDto: CreateListDto) => ({
        id: 42,
        ...createListDto,
    }),
};

describe('App todo (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [TodoModule],
        })
            .overrideProvider(ListsService)
            .useValue(listsService)
            .compile();

        app = await moduleRef.createNestApplication();
        await app.init();
    });

    it('responds to GET /lists', () => {
        return request(app.getHttpServer()).get('/lists').expect(200).expect({
            data: listsService.getAll(),
        });
    });

    it('responds to POST /lists', () => {
        return request(app.getHttpServer())
            .post('/lists')
            .send({ name: 'A sample list ' })
            .expect(201)
            .expect({
                data: {
                    id: 42,
                    name: 'A sample list',
                },
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
