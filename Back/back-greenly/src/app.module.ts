import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantasService } from './plantas/services/plantas.service';
import { PlantasController } from './plantas/controllers/plantas.controller';
import { Plantas } from './plantas/entities/plantas';
import { UserController } from '../src/usuario/controllers/user.controller';
import { UserService } from '../src/usuario/services/user.service';
import { User } from './usuario/entities/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia esto por el tipo de base de datos que estás usando
      host: 'greenly.c9k3e9wvgt2e.us-east-1.rds.amazonaws.com', // Cambia esto por tu host
      port: 5432, // Cambia esto por tu puerto
      username: 'viju', // Cambia esto por tu nombre de usuario
      password: 'Viju2003$', // Cambia esto por tu contraseña
      database: 'postgres', // Cambia esto por tu nombre de base de datos
      entities: [Plantas, User],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Plantas]),
  ],
  controllers: [AppController, PlantasController, UserController],
  providers: [AppService, PlantasService, UserService],
})
export class AppModule {}
