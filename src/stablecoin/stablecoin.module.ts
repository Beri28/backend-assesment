import { Module } from '@nestjs/common';
import { StablecoinService } from './stablecoin.service';
import { StablecoinController } from './stablecoin.controller';

@Module({
  controllers: [StablecoinController],
  providers: [StablecoinService],
})
export class StablecoinModule {}
