import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyService {
  createUsers(amount: number) {
    return 'This action adds a new dummy';
  }

  createTransactions(number: number) {
    return 'This action adds a new dummy';
  }

}
