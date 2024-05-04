import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.userService.login(username, password);
  }


  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('profileImage') profileImage: string,
  ): Promise<any> {
    const user = { name, email, username, password, profileImage };
    return this.userService.register(user);
  }
  

  
}
