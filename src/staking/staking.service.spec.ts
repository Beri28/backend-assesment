import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StakingService } from './staking.service';
import { StakingAsset, StakingAssetDocument } from './schemas/staking-asset.schema';

describe('StakingService', () => {
  let service: StakingService;
  let stakingAssetModel: Model<StakingAssetDocument>;

  const mockStakingAssets = [
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      type: 'Proof of Stake',
      currentRewardRate: 13.62,
      priceUsd: 2956.00,
      stakingRatio: 25.4,
    },
    {
      id: 'bnb-chain',
      symbol: 'BNB',
      name: 'BNB Chain',
      type: 'Proof of Stake',
      currentRewardRate: 12.72,
      priceUsd: 41.99,
      stakingRatio: 60.6,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StakingService,
        {
          provide: getModelToken(StakingAsset.name),
          useValue: {
            find: jest.fn().mockResolvedValue(mockStakingAssets),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StakingService>(StakingService);
    stakingAssetModel = module.get<Model<StakingAssetDocument>>(
      getModelToken(StakingAsset.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStakingAssets', () => {
    it('should return all staking assets', async () => {
      const result = await service.getStakingAssets();
      expect(result).toEqual(mockStakingAssets);
      expect(result.length).toBe(2);
    });
  });

  describe('getRewardRate', () => {
    it('should return reward rate for a specific asset', async () => {
      jest.spyOn(stakingAssetModel, 'findOne').mockResolvedValue(mockStakingAssets[0]);
      const result = await service.getRewardRate('ethereum');
      expect(result.currentRate).toBe(13.62);
      expect(result.historicalRates).toBeDefined();
    });

    it('should return 0 rate when asset not found', async () => {
      jest.spyOn(stakingAssetModel, 'findOne').mockResolvedValue(null);
      const result = await service.getRewardRate('invalid-asset');
      expect(result.currentRate).toBe(0);
    });
  });

  describe('getLiquidStakingPortfolio', () => {
    it('should return portfolio for wallet address', async () => {
      const result = await service.getLiquidStakingPortfolio('0x123');
      expect(result.totalValue).toBeDefined();
      expect(result.assets).toBeDefined();
      expect(Array.isArray(result.assets)).toBe(true);
    });
  });

  describe('stake', () => {
    it('should process staking transaction', async () => {
      const result = await service.stake('ethereum', 1.0, '0x123', 6);
      expect(result.success).toBe(true);
      expect(result.transaction).toBeDefined();
      expect(result.transaction.asset).toBe('ethereum');
      expect(result.transaction.amount).toBe(1.0);
    });
  });

  describe('unstake', () => {
    it('should process unstaking transaction', async () => {
      const result = await service.unstake('ethereum', 1.0, '0x123');
      expect(result.success).toBe(true);
      expect(result.transaction).toBeDefined();
      expect(result.transaction.asset).toBe('ethereum');
      expect(result.transaction.amount).toBe(1.0);
    });
  });

  describe('getStakingStatistics', () => {
    it('should return statistics for a specific asset', async () => {
      jest.spyOn(stakingAssetModel, 'findOne').mockResolvedValue(mockStakingAssets[0]);
      const result = await service.getStakingStatistics('ethereum');
      expect(result.price).toBe(2956.00);
      expect(result.stakingRatio).toBe(25.4);
      expect(result.rewardRate).toBe(13.62);
      expect(result.momentum).toBeDefined();
    });

    it('should return zero values when asset not found', async () => {
      jest.spyOn(stakingAssetModel, 'findOne').mockResolvedValue(null);
      const result = await service.getStakingStatistics('invalid-asset');
      expect(result.price).toBe(0);
      expect(result.stakingRatio).toBe(0);
      expect(result.rewardRate).toBe(0);
    });
  });
}); 