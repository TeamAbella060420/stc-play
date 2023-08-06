import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver'
import { StatisticsService } from './statistics.service';

@Module({
  imports: [HttpModule],
  providers: [StatisticsService, StatisticsResolver],
  exports: [StatisticsService],
})
export class StatisticsModule {}