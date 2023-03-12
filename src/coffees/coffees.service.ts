import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) { }

    findAll() {
        return this.coffeeRepository.find({ relations: ['flavor'] });
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne({ where: { id: +id }, relations: ['flavor'] });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not available`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found!`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.coffeeRepository.findOneBy({ id: +id });
        return this.coffeeRepository.remove(coffee);
    }
}