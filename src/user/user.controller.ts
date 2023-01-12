import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ){}

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() data: any) {
    return this.authService.login(data.user);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Put()
  async updateUser(@Body() updateUser: UpdateUserDto) {
    return this.userService.updateUser(updateUser);
  }

  @Delete('/:idUser')
  async deleteUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
