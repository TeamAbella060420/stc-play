import { Mutation, Query, Args, Resolver, Context } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { QuestionnaireService } from './questionnaire.service';
import { CommunityService } from './community.service';
import { AccountInput, AccountInputObject, AddressInput, PersonalizeQuestionnaireInput } from '../../../typeDefs/account';

@Resolver('Account')
export class AccountResolver {
  constructor(
    private accountService: AccountService,
    private questionnaireService: QuestionnaireService,
    private communityService: CommunityService
  ) {}

  @Mutation('editAccount')
  editAccount(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.update(details, request);
  }

  @Mutation('updateAddress')
  updateAddress(@Args('details') details: AddressInput, @Context('req') request: any) {
    return this.accountService.updateAddress(details, request);
  }

  @Query('getInfoByUsername')
  getInfoByUsername(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.getInfoByUsername(details, request);
  }

  @Query('getUserProfileInfo')
  getUserProfileInfo(@Context('req') request: any) {
    return this.accountService.getUserProfileInfo(request);
  }

  @Mutation('submitPersonalizationQuestionnaire')
  submitPersonalizationQuestionnaire(@Args('details') details: PersonalizeQuestionnaireInput, @Context('req') request: any) {
    return this.questionnaireService.submit(details, request);
  }

  @Mutation('followUser')
  followUser(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.communityService.follow(details, request);
  }

  @Mutation('unfollowUser')
  unfollowUser(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.communityService.unfollow(details, request);
  }

  @Mutation('updatePassword')
  updatePassword(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.updatePassword(details, request);
  }

  @Mutation('resetPasswordByOtp')
  resetPasswordByOtp(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.resetPasswordByOtp(details, request);
  }

  @Mutation('updateProfile')
  updateProfile(@Args('details') details: AccountInputObject, @Context('req') request: any) {
    return this.accountService.updateProfile(details.account_data, request);
  }

  @Mutation('updateUsername')
  updateUsername(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.updateUsername(details, request);
  }

  @Mutation('updateSettings')
  updateSettings(@Args('details') details: AccountInput, @Context('req') request: any) {
    return this.accountService.updateSettings(details, request);
  }
}
