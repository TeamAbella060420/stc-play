import { Mutation, Query, Args, Resolver, Context } from '@nestjs/graphql';
import { OTPService } from '../otp/otp.service';
import { LoginService } from '../auth/login.service';
import { SignUpInput, LoginInput, AppleSignUpInput, AppleLoginInput } from '../../../typeDefs/auth';
import { OTPInput } from './../../../typeDefs/otp';
import { SignUpService } from '../auth/signup.service';
import { UserService } from './user.service';
import { LockDurationInput } from '../../../typeDefs/account';

@Resolver('User')
export class UserResolver {
  constructor(
    private otpService: OTPService,
    private loginService: LoginService,
    private signUpService: SignUpService,
    private userService: UserService
  ) {}

  @Mutation('login')
  login(@Args('details') details: LoginInput, @Context('req') request: any) {
    return this.loginService.login(details, request);
  }

  @Mutation('appleSignin')
  appleSignin(@Args('details') details: AppleLoginInput, @Context('req') request: any) {
    return this.loginService.appleSignin(details, request);
  }

  @Mutation('createAccessLink')
  createAccessLink(@Args('details') details: LoginInput, @Context('req') request: any) {
    return this.loginService.createAccessLink(details, request);
  }

  @Mutation('signup')
  signup(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.signUpService.signup(details, request);
  }

  @Mutation('appleSignup')
  appleSignup(@Args('details') details: AppleSignUpInput, @Context('req') request: any) {
    return this.signUpService.appleSignup(details, request);
  }

  @Mutation('requestResetPasswordOTP')
  requestResetPasswordOTP(@Args('details') details: OTPInput, @Context('req') request: any) {
    return this.otpService.requestResetPasswordOTP(details, request);
  }

  @Mutation('requestOTP')
  requestOTP(@Args('details') details: OTPInput, @Context('req') request: any) {
    return this.otpService.requestOTP(details, request);
  }

  @Mutation('verifyOTP')
  verifyOTP(@Args('details') details: OTPInput, @Context('req') request: any) {
    return this.otpService.verifyOTP(details, request);
  }

  @Query('lockDuration')
  lockDuration(@Args('details') details: LockDurationInput, @Context('req') request: any) {
    return this.userService.lockDuration(details, request);
  }

  @Query('isUserFoundByEmail')
  isUserFoundByEmail(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isUserFoundByEmail(details, request);
  }

  @Mutation('logout')
  logout(@Context('req') request: any) {
    return this.userService.logout(request);
  }

  @Query('isUserFoundByUsername')
  isUserFoundByUsername(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isUserFoundByUsername(details, request);
  }

  @Mutation('isValidCurrentPassword')
  isValidCurrentPassword(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isValidCurrentPassword(details, request);
  }

  @Query('isUserFoundByMobile')
  isUserFoundByMobile(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isUserFoundByMobile(details, request);
  }

  @Query('isMobileAvailable')
  isMobileAvailable(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isMobileAvailable(details, request);
  }

  @Query('isValidReferral')
  isValidReferral(@Args('details') details: SignUpInput, @Context('req') request: any) {
    return this.userService.isValidReferral(details, request);
  }

  @Query('getWallet')
  getWallet(@Context('req') request: any) {
    return this.userService.getWallet(request);
  }
}
