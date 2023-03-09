import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavor')
  findAll() {
    return 'This will return all coffees';
  }
}
