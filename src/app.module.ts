import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StakingModule } from './staking/staking.module';
// import { DatabaseModule } from './database/database.module';
import { WalletModule } from './wallet/wallet.module';
import { StablecoinModule } from './stablecoin/stablecoin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/staking-dashboard'),
    CacheModule.register({
      isGlobal: true,
      ttl: 300000, // Default cache TTL: 5 minutes
    }),
    AuthModule,
    DashboardModule,
    StakingModule,
    WalletModule,
    StablecoinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
