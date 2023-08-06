import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver'
import { OTPService } from '../otp/otp.service'
import { LoginService } from '../auth/login.service';
import { SignUpService } from '../auth/signup.service';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  providers: [SignUpService, OTPService, LoginService, UserService, UserResolver],
  exports: [SignUpService, OTPService, LoginService, UserService],
})
export class UserModule {}