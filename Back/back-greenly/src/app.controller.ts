import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Hola mundo!";
  }

  @Get('nuevo')
  newEndpoint(): string {
    return "Nuevo endpoint";
  }

  @Get('ruta')
  hello(): string {
    return "Hola soy  Ines y soy tontaaaaaaaaa";
  }



  
}
