import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GenericService } from 'src/generic/service/crud.service';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';


@Injectable()
export class TransactionService extends GenericService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
  ) {
    super(repository);
    this.repository = repository;
  }

  async getTransactionsByIds(transaction_ids: number[]) {
    const transactions = await this.repository.find({
      where: {
        id: In(transaction_ids) // Assuming `In` is imported from TypeORM
      },
      relations: ["user", "partner"],
    });
    return transactions;
  }

  async createMultipleTransactions(transactionsData: Partial<Transaction>[]): Promise<Transaction[]> {
    const transactions = this.repository.create(transactionsData); // This maps plain objects to entity instances
    return await this.repository.save(transactions); // This saves the entities in the database
  }

}
