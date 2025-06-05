import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DashboardService } from './dashboard.service';
import { StakingService } from '../staking/staking.service';

interface DashboardOverview {
  portfolio: any;
  totalAssets: number;
  topPerformingAssets: any[];
}

interface PerformanceMetrics {
  totalValue: number;
  assets: Array<{
    asset: string;
    performance: {
      daily: string;
      monthly: string;
      yearly: string;
    };
  }>;
}

describe('DashboardService', () => {
  let service: DashboardService;
  let cacheManager: Cache;
  let stakingService: StakingService;

  const mockStakingAssets = [
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      currentRewardRate: 13.62,
      priceUsd: 2956.00,
      stakingRatio: 25.4,
    },
    {
      id: 'bnb-chain',
      symbol: 'BNB',
      name: 'BNB Chain',
      currentRewardRate: 12.72,
      priceUsd: 41.99,
      stakingRatio: 60.6,
    },
  ];

  const mockPortfolio = {
    totalValue: 9579.00,
    assets: [
      {
        asset: 'ethereum',
        amount: 7699.00,
        stakedAmount: 2.6,
        rewardRate: 13.62,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: StakingService,
          useValue: {
            getStakingAssets: jest.fn().mockResolvedValue(mockStakingAssets),
            getLiquidStakingPortfolio: jest.fn().mockResolvedValue(mockPortfolio),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    stakingService = module.get<StakingService>(StakingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardOverview', () => {
    it('should return cached data if available', async () => {
      const cachedData: DashboardOverview = {
        portfolio: mockPortfolio,
        totalAssets: 2,
        topPerformingAssets: mockStakingAssets,
      };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

      const result = await service.getDashboardOverview('0x123');
      expect(result).toEqual(cachedData);
      expect(cacheManager.get).toHaveBeenCalledWith('dashboard_overview_0x123');
    });

    it('should fetch and cache new data if cache is empty', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      
      const result = await service.getDashboardOverview('0x123') as DashboardOverview;
      expect(result.portfolio).toBeDefined();
      expect(result.totalAssets).toBeDefined();
      expect(result.topPerformingAssets).toBeDefined();
      expect(cacheManager.set).toHaveBeenCalled();
    });
  });

  describe('getRecommendedAssets', () => {
    it('should return cached recommendations if available', async () => {
      const cachedData = mockStakingAssets;
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

      const result = await service.getRecommendedAssets();
      expect(result).toEqual(cachedData);
    });

    it('should fetch and cache new recommendations if cache is empty', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      
      const result = await service.getRecommendedAssets() as any[];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(3);
      expect(cacheManager.set).toHaveBeenCalled();
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return cached metrics if available', async () => {
      const cachedData: PerformanceMetrics = {
        totalValue: 9579.00,
        assets: [{
          asset: 'ethereum',
          performance: {
            daily: '2.5',
            monthly: '30.0',
            yearly: '360.0',
          },
        }],
      };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

      const result = await service.getPerformanceMetrics('0x123');
      expect(result).toEqual(cachedData);
    });

    it('should calculate and cache new metrics if cache is empty', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      
      const result = await service.getPerformanceMetrics('0x123') as PerformanceMetrics;
      expect(result.totalValue).toBeDefined();
      expect(result.assets).toBeDefined();
      expect(result.assets[0].performance).toBeDefined();
      expect(cacheManager.set).toHaveBeenCalled();
    });
  });

  describe('getInvestmentPeriods', () => {
    it('should return investment periods with bonus rates', async () => {
      const result = await service.getInvestmentPeriods();
      expect(result.periods).toBeDefined();
      expect(Array.isArray(result.periods)).toBe(true);
      expect(result.periods.length).toBeGreaterThan(0);
      expect(result.periods[0]).toHaveProperty('months');
      expect(result.periods[0]).toHaveProperty('bonus_rate');
    });
  });

  
});
