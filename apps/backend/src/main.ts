/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

async function bootstrap() {
  console.log('📍 Starting application bootstrap...');
  const expressAdapter = new ExpressAdapter();

  try {
    console.log('📍 Creating NestJS application...');
    const app = await NestFactory.create(AppModule, expressAdapter, {
      // logger: new FilteredLogger(),
    });

    console.log('📍 Setting up routes...');
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;

    console.log('📍 Starting server on port', port);
    await app.listen(port);
    console.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('❌ Unhandled bootstrap error:', err);
  process.exit(1);
});
