import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SectionsResolver } from './section.resolver'
import { SectionsService } from './section.service';

@Module({
  imports: [HttpModule],
  providers: [SectionsService, SectionsResolver],
  exports: [SectionsService],
})
export class SectionsModule {}
