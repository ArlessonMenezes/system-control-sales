import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  // @Post()
  // async authenticate(@Body() data: AuthDto) {
  //   return this.authService.validateUser(data);
  // }
}
