import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';


const getJwtStrategyOptions = (configService: ConfigService) => ({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: "dklfsjkdslmfsklsdmfldsmfclkml",
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super(getJwtStrategyOptions(configService));
  }
  async validate(payload: any) {
    let user = await this.userService.findOne(payload.id)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }
}