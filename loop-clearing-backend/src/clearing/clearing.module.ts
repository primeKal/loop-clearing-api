import { Module } from '@nestjs/common';
import { ClearingService } from './clearing.service';
import { ClearingController } from './clearing.controller';

@Module({
  controllers: [ClearingController],
  providers: [ClearingService],
})
export class ClearingModule {}
