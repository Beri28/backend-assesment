import { Test, TestingModule } from '@nestjs/testing';
import { StablecoinController } from './stablecoin.controller';
import { StablecoinService } from './stablecoin.service';

describe('StablecoinController', () => {
  let controller: StablecoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StablecoinController],
      providers: [StablecoinService],
    }).compile();

    controller = module.get<StablecoinController>(StablecoinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
