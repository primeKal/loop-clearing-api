import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClearingService } from './clearing.service';
import { CreateClearingDto } from './dto/create-clearing.dto';
import { UpdateClearingDto } from './dto/update-clearing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clearing')
@Controller('clearing')
export class ClearingController {
  constructor(private readonly clearingService: ClearingService) { }

  @Post()
  create(@Body() createClearingDto: CreateClearingDto) {
    return this.clearingService.create(createClearingDto);
  }

  @Get()
  findAll() {
    return this.clearingService.findAll();
  }
  @Get('byUserId/:id')
  findClearingByUserId(@Param('id') id: string) {
    return this.clearingService.getClearingByUserId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clearingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClearingDto: UpdateClearingDto) {
    return this.clearingService.update(+id, updateClearingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clearingService.remove(+id);
  }
}
