import { Test, TestingModule } from '@nestjs/testing';
import { LogIndexingService } from './log-indexing.service';

describe('LogIndexingService', () => {
  let service: LogIndexingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogIndexingService],
    }).compile();

    service = module.get<LogIndexingService>(LogIndexingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
