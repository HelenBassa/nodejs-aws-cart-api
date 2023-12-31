import { NestFactory } from '@nestjs/core';
import { Context, Handler, Callback } from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import helmet from 'helmet';

import { AppModule } from './app.module';

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  console.log('event', event);
  return server(event, context, callback);
};
