import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { Currency } from './entities/currency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [TypeOrmModule.forFeature([Currency])]

})
export class CurrencyModule { }
