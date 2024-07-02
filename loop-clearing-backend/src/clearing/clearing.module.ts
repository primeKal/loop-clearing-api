import { Module } from '@nestjs/common';
import { ClearingService } from './clearing.service';
import { ClearingController } from './clearing.controller';
import { Clearing } from './entities/clearing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClearingController],
  providers: [ClearingService],
  imports: [TypeOrmModule.forFeature([Clearing])]

})
export class ClearingModule { }
