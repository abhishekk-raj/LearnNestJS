import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesModule } from "../../src/coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateCoffeeDto } from "src/coffees/dto/create-coffee.dto";
import * as request from 'supertest';


describe('[Feature] Coffees - /coffees', () => {
    const coffee = {
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla']
    };

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
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        }));
        await app.init();
    });

    it('Create [POST /]', () => {
        return request(app.getHttpServer())
            .post('/coffees')
            .send(coffee as unknown as CreateCoffeeDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                const expectedCoffee = jasmine.objectContaining({
                    ...coffee,
                    flavors: jasmine.arrayContaining(
                        coffee.flavors.map(name => jasmine.objectContaining({ name }))
                    ),
                });
                expect(body).toEqual(expectedCoffee);
            });
    });

    it.todo('Get All [GET /]');
    it.todo('Get One [GET /:id]');
    it.todo('Update One [PATCH /:id]');
    it.todo('Delete One [DELETE /:id]');

    afterAll(async () => {
        await app.close();
    });
});