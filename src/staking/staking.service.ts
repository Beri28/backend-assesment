import { Injectable } from '@nestjs/common';

@Injectable()
export class StakingService {
  private stakingAssets = [
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
    {
      id: 'polygon',
      symbol: 'MATIC',
      name: 'Polygon',
      type: 'Proof of Stake',
      currentRewardRate: 6.29,
      priceUsd: 0.987,
      stakingRatio: 38.2,
    },
  ];

  async getStakingAssets() {
    return this.stakingAssets;
  }

  async getRewardRate(asset: string) {
    const stakingAsset = this.stakingAssets.find(a => a.id === asset);
    return {
      currentRate: stakingAsset?.currentRewardRate || 0,
      historicalRates: [
        // Mock historical data
        { timestamp: Date.now() - 86400000, rate: stakingAsset?.currentRewardRate - 0.5 },
        { timestamp: Date.now(), rate: stakingAsset?.currentRewardRate },
      ],
    };
  }

  async getLiquidStakingPortfolio(walletAddress: string) {
    // Mock portfolio data
    return {
      totalValue: 9579.00,
      assets: [
        {
          asset: 'ethereum',
          amount: 7699.00,
          stakedAmount: 2.6,
          rewardRate: 13.62,
        },
        {
          asset: 'bnb-chain',
          amount: 1340.00,
          stakedAmount: 31.39,
          rewardRate: 12.72,
        },
        {
          asset: 'polygon',
          amount: 540.00,
          stakedAmount: 547.11,
          rewardRate: 6.29,
        },
      ],
    };
  }

  async stake(asset: string, amount: number, walletAddress: string, period: number) {
    // Mock staking transaction
    return {
      success: true,
      transaction: {
        asset,
        amount,
        walletAddress,
        period,
        timestamp: Date.now(),
        status: 'confirmed',
      },
    };
  }

  async unstake(asset: string, amount: number, walletAddress: string) {
    // Mock unstaking transaction
    return {
      success: true,
      transaction: {
        asset,
        amount,
        walletAddress,
        timestamp: Date.now(),
        status: 'confirmed',
      },
    };
  }

  async getStakingStatistics(asset: string) {
    const stakingAsset = this.stakingAssets.find(a => a.id === asset);
    return {
      price: stakingAsset?.priceUsd || 0,
      stakingRatio: stakingAsset?.stakingRatio || 0,
      rewardRate: stakingAsset?.currentRewardRate || 0,
      momentum: {
        trend: -0.82,
        period: '24H',
      },
    };
  }
} 