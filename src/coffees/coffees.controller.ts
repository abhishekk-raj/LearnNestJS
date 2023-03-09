import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavor')
  findAll() {
    return 'This will return all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This will return coffee #${id}`;
  }
}
