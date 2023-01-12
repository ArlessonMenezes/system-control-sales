import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService){
    super({ usernameField: 'register' })
  }

  async validate(register: string, password: string) {
    const user = await this.authService.validateUser(register, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}