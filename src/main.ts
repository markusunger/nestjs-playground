import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        logger: true,
    });
    await app.listen(process.env.PORT || 3000);
    console.log(`Backend running on ${await app.getUrl()}`);
}
bootstrap().catch((e) => console.error(e));
