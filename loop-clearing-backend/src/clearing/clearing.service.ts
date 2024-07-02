import { Injectable } from '@nestjs/common';
import { CreateClearingDto } from './dto/create-clearing.dto';
import { UpdateClearingDto } from './dto/update-clearing.dto';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Clearing } from './entities/clearing.entity';
import { GenericService } from 'src/generic/service/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClearingService extends GenericService<Clearing> {
  constructor(
    @InjectRepository(Clearing)
    repository: Repository<Clearing>,
  ) {
    super(repository);
  }


  minimizeTransactions(transactions: Transaction[]): Transaction[] {
    // Step 1: Build the graph
    const graph = new Map<number, Map<number, number>>();
    transactions.forEach(({ user_id, partner_id, value }) => {
      if (!graph.has(user_id)) graph.set(user_id, new Map());
      const edges = graph.get(user_id);
      const currentAmount = edges.get(partner_id) || 0;
      edges.set(partner_id, currentAmount + value);
    });

    // Step 2: Find and minimize cycles - This is a simplified approach
    // In a real scenario, you would use a more complex algorithm to find and minimize cycles
    const minimizedTransactions: Transaction[] = [];
    graph.forEach((edges, user_id) => {
      edges.forEach((value, partner_id) => {
        // For simplicity, we're directly using the transactions as minimized transactions
        // A real implementation would involve finding cycles and minimizing transactions within those cycles
        minimizedTransactions.push({ user_id, partner_id, value, "is_future": true } as any);
      });
    });

    return minimizedTransactions;
  }
}
