import { Injectable, NestMiddleware } from '@nestjs/common';
import e, { Request, Response, NextFunction } from 'express';

@Injectable()
export class Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Query Parameters:', req.query);

    // Interceptar la respuesta
    const originalSend = res.send;
    res.send = function (body) {
      console.log('Response Body:', body);
      return originalSend.apply(this, arguments);
    };

    next();
  }
}

