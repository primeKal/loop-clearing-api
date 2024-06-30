import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { DummyModule } from './dummy/dummy.module';
import { ClearingModule } from './clearing/clearing.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    TransactionModule,
    CurrencyModule,
    DummyModule,
    ClearingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
