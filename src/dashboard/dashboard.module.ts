import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { StakingModule } from '../staking/staking.module';

@Module({
  imports: [StakingModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
