import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { classToPlain } from 'class-transformer';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    let user = await this.userService.findOneByEmail(email)
    console.log("found",user)
    if (!user) {
      console.log("user with this email not found")
      throw new UnauthorizedException();
    }
    console.log(user)
    if (!await bcrypt.compare(password, user.password)) {
      console.log("incorrect password for this user")
      throw new UnauthorizedException();
    }
    let data = await this.authService.generateToken(classToPlain(user));
    return data
  }
}