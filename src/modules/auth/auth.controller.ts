import { Body, Controller, Get, Post ,  UsePipes,ValidationPipe, Response, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getInfo(): string {
    return 'hi';
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() authDto : AuthDto ){
      return this.authService.signUp(authDto);
  }

  @Post('signin')
  async signin(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.signin(dto, req, res);
  }
}
