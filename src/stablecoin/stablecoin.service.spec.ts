import { Test, TestingModule } from '@nestjs/testing';
import { StablecoinService } from './stablecoin.service';

describe('StablecoinService', () => {
  let service: StablecoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StablecoinService],
    }).compile();

    service = module.get<StablecoinService>(StablecoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
