import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GenericService } from 'src/generic/service/crud.service';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TransactionService extends GenericService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
  ) {
    super(repository);
  }
}
