import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

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

  @Post('refresh')
async refresh(@Body('refreshToken') refreshToken: string) {
  return this.userService.refreshToken(refreshToken);
}
}
