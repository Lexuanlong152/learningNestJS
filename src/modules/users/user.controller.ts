import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'modules/auth/jwt.guard';
@Controller('users')
export class UserController {
  
  constructor( private readonly userService: UserService){
    
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: number }, @Req() req) {
    console.log(params.id);
    return this.userService.getMyUser(params.id, req);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  
}
