import { Query, Resolver,Args, Context } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { SearchInput } from '../../../typeDefs/search';

@Resolver('Search')
export class SearchResolver {
   
constructor(
    private searchService: SearchService,
) {}

  @Query('getGlobalSearch')
    getGlobalSearch(
      @Context('req') request: any,
      @Args('details') details: SearchInput,
    ) {
      return this.searchService.getGlobalSearch(
          details,
          request
      )
  }  

  @Query('getSearchInfo')
  getSearchInfo(
    @Context('req') request: any,
    @Args('details') details: SearchInput,
  ) {
    return this.searchService.getSearchInfo(
        details,
        request
    )
  }  
  
}
