import { Query, Resolver, Context } from '@nestjs/graphql';
import { SectionsService } from './section.service';

@Resolver('Sections')
export class SectionsResolver
{
constructor(
    private sectionsService: SectionsService,
) {}

  @Query('getAllTournamentSections')
  getAllTournamentSections(
    @Context('req') request: any,
  ) {
    return this.sectionsService.getAllTournamentSections(
        request
    )
  }
}
