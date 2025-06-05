import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StakingAssetDocument = StakingAsset & Document;

@Schema()
export class StakingAsset {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  currentRewardRate: number;

  @Prop({ required: true })
  priceUsd: number;

  @Prop({ required: true })
  stakingRatio: number;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const StakingAssetSchema = SchemaFactory.createForClass(StakingAsset); 