import { Query, Resolver, Context } from '@nestjs/graphql';
import { GeoService } from '../geo/geo.service';

@Resolver('Geo')
export class GeoResolver {
   
constructor(
    private geoService: GeoService
) {}

  @Query('countries')
  GetAllCountrie(
    @Context('req') request: any,
  ) {
    return this.geoService.getAllCountries(
      request
    )
  }


  @Query('servedCountrie')
  GetServedCountrie(
    @Context('req') request: any,
  ) {
    return this.geoService.getServedCountrie(
      request
    )
  }
  
}
