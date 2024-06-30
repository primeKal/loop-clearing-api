import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dummy-Data')
@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Get('createUsers/:id')
  createUsers(@Param('id') id: string) {
    return this.dummyService.createUsers(+id);
  }

  @Get('createTransactions/:id')
  createTransactions(@Param('id') id: string) {
    return this.dummyService.createTransactions(+id);
  }

}
