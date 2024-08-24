import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:8081', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Cabeceras permitidas
  });

  // Aumentar el límite de tamaño del cuerpo para peticiones grandes
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Usar el middleware de compresión
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
