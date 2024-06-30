import { Test, TestingModule } from '@nestjs/testing';
import { ClearingController } from './clearing.controller';
import { ClearingService } from './clearing.service';

describe('ClearingController', () => {
  let controller: ClearingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClearingController],
      providers: [ClearingService],
    }).compile();

    controller = module.get<ClearingController>(ClearingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
