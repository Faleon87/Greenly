import {
  Body,
  Controller,  
  Get,  
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto} from '../dtos/update-dto';

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
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    // Ahora puedes pasar directamente createUserDto a tu servicio
    return this.userService.register(createUserDto);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') idUser: number): Promise<any> {
    return this.userService.getProfile(idUser);
  }

  @Patch('update/:id')
  async update(
    @Param('id') idUser: number,
    @Body() updatedData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(idUser, updatedData);
  }

}
