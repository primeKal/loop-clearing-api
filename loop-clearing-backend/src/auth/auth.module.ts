import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
// Import the 'JwtModule' from the appropriate package

@Module({
  imports: [UserModule, JwtModule.register({
    secret: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
    // privateKey:'sdlklkdsasalkdaslksa',
    signOptions: { expiresIn: "1d" }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule { }
