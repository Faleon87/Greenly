import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantasService } from './plantas/services/plantas.service';
import { PlantasController } from './plantas/controllers/plantas.controller';
import { Plantas } from './plantas/entities/plantas';
import { UserController } from './usuario/controllers/user.controller';
import { UserService } from './usuario/services/user.service';
import { User } from './usuario/entities/user';
import { FotoPreguntas } from './chat/entities/foto-preguntas';
import { Pregunta } from './chat/entities/pregunta';
import { Likes } from './chat/entities/likes';
import { Respuestas } from './chat/entities/respuestas';
import { BenefPerd } from './beneficios_per/entities/benef_perd';
import { ChatController } from './chat/controllers/chat.controller';
import { PreguntaServiceService } from './chat/services/pregunta-service.service';
import { FotoPreguntasService } from './chat/services/foto-preguntas.service';
import { LikesService } from './chat/services/likes.service';
import { PlagasController } from './plagas/controller/plagas.controller';
import { PlagasService } from './plagas/services/plagas.service';
import { Plagas } from './plagas/entities/plagas';
import { PlagasDtoDetail } from './plagas/dtos/plagas-dto-detail';
import { Fertilizantes } from './fertilizantes/entities/fertilizantes';
import { FertilizantesController } from './fertilizantes/controllers/fertilizantes.controller';
import { FertilizantesService } from './fertilizantes/services/fertilizantes.service';
import { CalendarController } from './calendario/controllers/calendar.controller';
import { CalendarService } from './calendario/services/calendar.service';
import { Calendar } from './calendario/entities/calendar';
import { ProductosController } from './productos/controller/productos.controller';
import { ProductosService } from './productos/servicies/productos.service';
import { HerramientasController } from './herramientas/controller/herramientas.controller';
import { HerramientasService } from './herramientas/servicies/herramientas.service';
import { SemillasController } from './semillas/controller/semillas.controller';
import { SemillasService } from './semillas/servicies/semillas.service';
import { AbonosController } from './abonos/controller/abonos.controller';
import { AbonosService } from './abonos/servicies/abonos.service';
import { CarritoController } from './carrito/controller/carrito.controller';
import { CarritoService } from './carrito/servicies/carrito.service';
import { Abonos } from './abonos/entities/abonos';
import { Herramientas } from './herramientas/entities/herramientas';
import { Semillas } from './semillas/entities/semillas';
import { Productos } from './productos/entities/productos';
import { Carrito } from './carrito/entities/carrito';
import { TarjetaController } from './tarjeta/controller/tarjeta.controller';
import { TarjetaService } from './tarjeta/servicies/tarjeta.service';
import { Tarjeta } from './tarjeta/entities/tarjeta';
import { Reports } from './chat/entities/reports';
import { ReportsService } from './chat/services/reports.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia esto por el tipo de base de datos que estás usando
      host: 'green.cnw4y4u06yd5.us-east-1.rds.amazonaws.com', // Cambia esto por tu host
      port: 5432, // Cambia esto por tu puerto
      username: 'postgres', // Cambia esto por tu nombre de usuario
      password: 'Viju2003$', // Cambia esto por tu contraseña
      database: 'postgres', // Cambia esto por tu nombre de base de datos
      entities: [
        Plantas,
        User,
        FotoPreguntas,
        Pregunta,
        Likes,
        Respuestas,
        BenefPerd,
        Plagas,
        Fertilizantes,
        Calendar,
        Herramientas,
        Semillas,
        Abonos,
        Productos,
        Carrito,
        Tarjeta,
        Reports,
      ],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: ['error' , 'warn' , 'info' , 'log'],
    }),
    TypeOrmModule.forFeature([
      Plantas,
      User,
      FotoPreguntas,
      Pregunta,
      Likes,
      Respuestas,
      BenefPerd,
      Plagas,
      Fertilizantes,
      Calendar,
      Productos,
      Herramientas,
      Semillas,
      Abonos,
      Carrito,
      Tarjeta,
      Reports,
    ]),
  ],
  controllers: [
    AppController,
    PlantasController,
    UserController,
    ChatController,
    PlagasController,
    FertilizantesController,
    CalendarController,
    ProductosController,
    HerramientasController,
    SemillasController,
    AbonosController,
    CarritoController,
    TarjetaController,
  ],
  providers: [
    AppService,
    PlantasService,
    UserService,
    PreguntaServiceService,
    FotoPreguntasService,
    LikesService,
    PlagasService,
    PlagasDtoDetail,
    FertilizantesService,
    CalendarService,
    ProductosService,
    HerramientasService,
    SemillasService,
    AbonosService,
    CarritoService,
    TarjetaService,
    ReportsService,
  ],
})
export class AppModule {}
