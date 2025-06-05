import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
// @UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  async getDashboardOverview(@Query('walletAddress') walletAddress: string) {
    return this.dashboardService.getDashboardOverview(walletAddress);
  }

  @Get('recommended')
  async getRecommendedAssets() {
    return this.dashboardService.getRecommendedAssets();
  }

  @Get('performance')
  async getPerformanceMetrics(@Query('walletAddress') walletAddress: string) {
    return this.dashboardService.getPerformanceMetrics(walletAddress);
  }

  @Get('investment-periods')
  async getInvestmentPeriods() {
    return this.dashboardService.getInvestmentPeriods();
  }
}
