import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';

/* It's just a psudo code */
@Injectable()
export class CoffeeBrandFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        { provide: COFFEE_BRANDS, useFactory: (brandFactory: CoffeeBrandFactory) => brandFactory.create(), inject: [CoffeeBrandFactory] }
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }
