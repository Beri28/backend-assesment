import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { StakingService } from '../staking/staking.service';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly stakingService: StakingService,
  ) {}

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }

  async getDashboardOverview(walletAddress: string) {
    const cacheKey = `dashboard_overview_${walletAddress}`;
    const cachedData = await this.cacheManager.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const portfolio = await this.stakingService.getLiquidStakingPortfolio(walletAddress);
    const assets = await this.stakingService.getStakingAssets();
    
    const overview = {
      portfolio,
      totalAssets: assets.length,
      topPerformingAssets: assets
        .sort((a, b) => b.currentRewardRate - a.currentRewardRate)
        .slice(0, 3),
    };

    await this.cacheManager.set(cacheKey, overview, 300000); // Cache for 5 minutes
    return overview;
  }

  async getRecommendedAssets() {
    const cacheKey = 'recommended_assets';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const assets = await this.stakingService.getStakingAssets();
    const recommended = assets
      .sort((a, b) => b.currentRewardRate - a.currentRewardRate)
      .slice(0, 3)
      .map(asset => ({
        ...asset,
        recommendation_reason: 'High reward rate',
      }));

    await this.cacheManager.set(cacheKey, recommended, 300000); // Cache for 5 minutes
    return recommended;
  }

  async getPerformanceMetrics(walletAddress: string) {
    const cacheKey = `performance_${walletAddress}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const portfolio = await this.stakingService.getLiquidStakingPortfolio(walletAddress);
    const metrics = {
      totalValue: portfolio.totalValue,
      assets: portfolio.assets.map(asset => ({
        asset: asset.asset,
        performance: {
          daily: ((asset.rewardRate / 365) * asset.stakedAmount).toFixed(2),
          monthly: ((asset.rewardRate / 12) * asset.stakedAmount).toFixed(2),
          yearly: (asset.rewardRate * asset.stakedAmount).toFixed(2),
        },
      })),
    };

    await this.cacheManager.set(cacheKey, metrics, 300000); // Cache for 5 minutes
    return metrics;
  }

  async getInvestmentPeriods() {
    return {
      periods: [
        { months: 1, bonus_rate: 0 },
        { months: 3, bonus_rate: 0.5 },
        { months: 6, bonus_rate: 1.2 },
        { months: 12, bonus_rate: 2.5 },
      ],
    };
  }
}
