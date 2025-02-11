import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * Add a new cat
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cat,
  })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  /**
   * Get all cats
   */
  @Get()
  @ApiResponse({ status: 200, description: 'The found records', type: [Cat] })
  findAll() {
    return this.catsService.findAll();
  }

  /**
   * Get a single cat
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found record', type: Cat })
  @ApiResponse({ status: 400, description: 'Bad Request. Cat not found!' })
  @ApiParam({ name: 'id', type: 'number', description: 'Cat ID' })
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  /**
   * Update a cat
   */
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Cat,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Cat not found!' })
  @ApiParam({ name: 'id', type: 'number', description: 'Cat ID' })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  /**
   * Remove a cat
   */
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Cat not found!' })
  @ApiParam({ name: 'id', type: 'number', description: 'Cat ID' })
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
