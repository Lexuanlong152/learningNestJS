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
    let authReal = AuthDto.plainToClass(authDto)
    console.log(authReal);

      return this.authService.signUp(authReal);
  }

  @Post('signin')
  async signIn(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.signIn(dto, req, res);
  }

  @Post('signout')
  signOut(@Request() req, @Response() res) {
    return this.authService.signOut(req, res);
  }
}
