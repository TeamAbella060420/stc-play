import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';


@Module({
  imports: [HttpModule],
  providers: [ContentService, ContentResolver],
  exports: [ContentService],
})
export class ContentModule {}