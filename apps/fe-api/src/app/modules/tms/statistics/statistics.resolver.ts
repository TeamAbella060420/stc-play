import { Query, Resolver, Context } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';

@Resolver('Statistics')
export class StatisticsResolver 
{
constructor(
    private statisticsService: StatisticsService,
) {}

  @Query('getAllTournamentStatistecs')
  getAllTournamentStatistecs(
    @Context('req') request: any,
  ) {
    return this.statisticsService.getAllTournamentStatistecs(
        request
    )
  } 
}
