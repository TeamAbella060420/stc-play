import { Mutation, Query, Args, Resolver, Context } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { SearchInput } from '../../../typeDefs/search'

@Resolver('History')
export class HistoryResolver {
   
constructor(
    private historyService: HistoryService,
) {}

  @Query('getAllSearchHistory')
  getAllSearchHistory(
    @Context('req') request: any,
  ) {
    return this.historyService.getAllSearchHistory(
        request
    )
  }

  @Mutation('saveSearchHistory')
  saveSearchHistory(
    @Args('details') details: SearchInput,
    @Context('req') request: any,
  ) {
    return this.historyService.saveSearchHistory(
        details,
        request
    )
  }

  @Mutation('clearSearchHistory')
  clearSearchHistory(
    @Args('details') details: SearchInput,
    @Context('req') request: any,
  ) {
    return this.historyService.clearSearchHistory(
        details,
        request
    )
  }

  @Mutation('clearAllSearchHistory')
  clearAllSearchHistory(
    @Context('req') request: any,
  ) {
    return this.historyService.clearAllSearchHistory(
        request
    )
  }
  

  
 
}
