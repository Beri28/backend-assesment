import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StakingController } from './staking.controller';
import { StakingService } from './staking.service';
import { StakingAsset, StakingAssetSchema } from './schemas/staking-asset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StakingAsset.name, schema: StakingAssetSchema },
    ]),
  ],
  controllers: [StakingController],
  providers: [StakingService],
  exports: [StakingService],
})
export class StakingModule {} 