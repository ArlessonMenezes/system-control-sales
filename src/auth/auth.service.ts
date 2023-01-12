import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/user/model/user.entity';
import { UserRepository } from 'src/user/model/user.repository';
import { sign } from 'jsonwebtoken'
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async validateUser(register: string, password: string) {
    const user = await this.userService.getOneUser(register);

    if (user.register !== register) throw new NotFoundException('register or password incorrect.');

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) throw new NotFoundException('register or password incorrect.');

    const { password:_, ...result } = user;
    
    return result;
  }

  async login(user: User) {
    const payload = { register: user.register, sub: user.idUser }

    const token = this.jwtService.sign(payload);

    const { password:_, ...userLogin } = user;

    return { user: userLogin, token_access: token }
  }
}
