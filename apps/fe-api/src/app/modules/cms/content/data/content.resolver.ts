import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { ContentInput } from '../../../../typeDefs/content'

@Resolver('Content')
export class ContentResolver {
   
constructor(
    private contentService: ContentService,
) {}

@Query('getStaticPage')
  getStaticPage(
    @Context('req') request: any,
    @Args('details') details: ContentInput,
  ) {
    return this.contentService.getStaticPage(
        details,
        request
    )
  }

@Query('getFaqs')
  getFaqs(
    @Context('req') request: any
  ) {
    return this.contentService.getFaqs(
        request
    )
  }
  

}
