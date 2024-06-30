import { Test, TestingModule } from '@nestjs/testing';
import { ClearingService } from './clearing.service';

describe('ClearingService', () => {
  let service: ClearingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClearingService],
    }).compile();

    service = module.get<ClearingService>(ClearingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
