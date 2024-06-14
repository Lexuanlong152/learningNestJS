import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Inject
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  
  constructor(@Inject('USER_SERVICE') private readonly userService: UserService){
    
  }
  @Get()
  getAllUsers() {
    return [
      {
        name: 'long',
        age: 23,
      },
    ];
  }
  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    console.log(id);
    return [
      {
        name: 'long2',
        age: 23,
      },
    ];
  }
}
