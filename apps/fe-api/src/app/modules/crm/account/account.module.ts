import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service';
import { QuestionnaireService } from './questionnaire.service';
import { CommunityService } from './community.service';

@Module({
  imports: [HttpModule],
  providers: [AccountService, QuestionnaireService, CommunityService, AccountResolver],
  exports: [AccountService, QuestionnaireService, CommunityService],
})
export class AccountModule {}