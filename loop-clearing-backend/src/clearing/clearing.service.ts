import { Injectable } from '@nestjs/common';
import { CreateClearingDto } from './dto/create-clearing.dto';
import { UpdateClearingDto } from './dto/update-clearing.dto';

@Injectable()
export class ClearingService {
  create(createClearingDto: CreateClearingDto) {
    return 'This action adds a new clearing';
  }

  findAll() {
    return `This action returns all clearing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clearing`;
  }

  update(id: number, updateClearingDto: UpdateClearingDto) {
    return `This action updates a #${id} clearing`;
  }

  remove(id: number) {
    return `This action removes a #${id} clearing`;
  }
}
