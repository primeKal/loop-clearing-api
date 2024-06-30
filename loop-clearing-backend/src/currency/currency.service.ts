import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { GenericService } from 'src/generic/service/crud.service';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CurrencyService extends GenericService<Currency> {
  constructor(
    @InjectRepository(Currency)
    repository: Repository<Currency>,
  ) {
    super(repository);
  }
}
