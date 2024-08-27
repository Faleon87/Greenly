import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Cabeceras permitidas
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true }));

  // Usar el middleware de compresión
  app.use(compression());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
