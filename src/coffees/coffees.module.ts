import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }
