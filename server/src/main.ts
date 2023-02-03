/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    await app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
