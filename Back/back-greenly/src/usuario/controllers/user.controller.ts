import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';


@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

   
    @Post('login')
    async login(@Body('username') username: string, @Body('email') email: string, @Body('password') password: string): Promise<any> {
        return this.userService.login(username, email, password);
    }


    // Aquí puedes agregar más manejadores de ruta según las necesidades de tu aplicación,
    // como manejadores para crear, actualizar y eliminar usuarios.
}
