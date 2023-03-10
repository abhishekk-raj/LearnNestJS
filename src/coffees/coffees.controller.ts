import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This will return all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This will return coffee #${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This will update coffee #${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This will delete coffee #${id}`;
  }
}
