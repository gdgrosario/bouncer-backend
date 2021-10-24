import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setSwagger } from './swagger';
import * as Helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);
  app.use(Helmet());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
