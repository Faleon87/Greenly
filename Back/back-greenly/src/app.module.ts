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
import { PlagasDto } from './plagas/dtos/plagas-dto';
import { PlagasDtoDetail } from './plagas/dtos/plagas-dto-detail';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia esto por el tipo de base de datos que estás usando
      host: 'greenly.c9k3e9wvgt2e.us-east-1.rds.amazonaws.com', // Cambia esto por tu host
      port: 5432, // Cambia esto por tu puerto
      username: 'viju', // Cambia esto por tu nombre de usuario
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
      ],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
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
    ]),
  ],
  controllers: [
    AppController,
    PlantasController,
    UserController,
    ChatController,
    PlagasController,
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
  ],
})
export class AppModule {}
