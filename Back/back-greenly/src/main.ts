import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usar el middleware de compresión
  app.use(compression());

  // Configurar el parser de body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware para manejar las cabeceras
  app.use((_req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // Iniciar el servidor en el puerto 3000
  await app.listen(3000, '0.0.0.0');
}

bootstrap();