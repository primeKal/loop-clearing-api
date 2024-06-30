import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Loop Clearing API')
    .setDescription('This the API for clearing loops between users(partners)')
    .setVersion('1.0')
    // .addTag('my-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);

  app.enableCors();
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });
  await app.listen(8000);
}
bootstrap();
