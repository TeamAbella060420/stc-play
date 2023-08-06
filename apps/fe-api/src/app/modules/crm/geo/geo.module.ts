import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeoResolver } from './geo.resolver'
import { GeoService } from '../geo/geo.service';

@Module({
  imports: [HttpModule],
  providers: [GeoService,GeoResolver],
  exports: [GeoService],
})
export class GeoModule {}