import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesModule } from "../../src/coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";


describe('[Feature] Coffees - /coffees', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffeesModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgress',
                    password: 'pass123',
                    database: 'postgress',
                    synchronize: true
                })
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it.todo('Create [POST /]');
    it.todo('Get All [GET /]');
    it.todo('Get One [GET /:id]');
    it.todo('Update One [PATCH /:id]');
    it.todo('Delete One [DELETE /:id]');

    afterAll(async () => {
        await app.close();
    });
});