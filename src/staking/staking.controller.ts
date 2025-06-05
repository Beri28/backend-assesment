import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { StakingService } from './staking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('staking')
// @UseGuards(JwtAuthGuard)
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('assets')
  async getStakingAssets() {
    return this.stakingService.getStakingAssets();
  }

  @Get('portfolio')
  async getLiquidStakingPortfolio(@Query('walletAddress') walletAddress: string) {
    return this.stakingService.getLiquidStakingPortfolio(walletAddress);
  }

  @Post('stake')
  async stake(
    @Body('asset') asset: string,
    @Body('amount') amount: number,
    @Body('walletAddress') walletAddress: string,
    @Body('period') period: number,
  ) {
    return this.stakingService.stake(asset, amount, walletAddress, period);
  }

  @Post('unstake')
  async unstake(
    @Body('asset') asset: string,
    @Body('amount') amount: number,
    @Body('walletAddress') walletAddress: string,
  ) {
    return this.stakingService.unstake(asset, amount, walletAddress);
  }

  @Get('statistics/:assetId')
  async getStakingStatistics(@Param('assetId') assetId: string) {
    return this.stakingService.getStakingStatistics(assetId);
  }
  @Get('providers')
  async getStakingProviders(@Query('asset') asset: string) {
    return this.stakingService.getStakingStatistics(asset);
  }

  @Get('active')
  async getActiveStaking(@Query('asset') asset: string) {
    return this.stakingService.getStakingStatistics(asset);
  }

  @Get('top')
  async getTopStakings(@Query('asset') asset: string) {
    return this.stakingService.getStakingStatistics(asset);
  }

  @Get('liquid')
  async getLiquidStakings(@Query('asset') asset: string) {
    return this.stakingService.getStakingStatistics(asset);
  }
  @Post('providers')
  async addStakingProviders(@Body('id') id: string) {
    return this.stakingService.getStakingStatistics(id);
  }
} 