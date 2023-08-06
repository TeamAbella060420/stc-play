import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HistoryResolver } from './history.resolver'
import { HistoryService } from './history.service';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver'

@Module({
  imports: [HttpModule],
  providers: [HistoryService, SearchService, HistoryResolver, SearchResolver],
  exports: [HistoryService, SearchService],
})
export class SearchModule {}