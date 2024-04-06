import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: {
        domain: ['production', 'staging']?.includes(process.env.NODE_ENV)
          ? ''
          : undefined,
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE),
        secure: ['production', 'staging']?.includes(process.env.NODE_ENV)
          ? true
          : false,
        sameSite: ['production', 'staging']?.includes(process.env.NODE_ENV)
          ? 'none'
          : 'lax',
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8080);
}
bootstrap();
