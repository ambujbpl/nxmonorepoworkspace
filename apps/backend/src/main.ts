/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Socket } from 'node:net';
import { AppModule } from './app/app.module';

// Custom logger to filter out websocket logs
class FilteredLogger extends ConsoleLogger {
  override log(message: unknown, context?: string) {
    if (
      typeof message === 'string' &&
      (message.includes('websocket') ||
        message.includes('WebSocket') ||
        message.includes('upgrade') ||
        message.includes('ws:'))
    ) {
      return; // Skip websocket-related logs
    }
    super.log(message, context);
  }

  override debug(message: unknown, context?: string) {
    if (
      typeof message === 'string' &&
      (message.includes('websocket') ||
        message.includes('WebSocket') ||
        message.includes('upgrade') ||
        message.includes('ws:'))
    ) {
      return; // Skip websocket-related logs
    }
    super.debug(message, context);
  }

  override verbose(message: unknown, context?: string) {
    if (
      typeof message === 'string' &&
      (message.includes('websocket') ||
        message.includes('WebSocket') ||
        message.includes('upgrade') ||
        message.includes('ws:'))
    ) {
      return; // Skip websocket-related logs
    }
    super.verbose(message, context);
  }

  override error(message: unknown, trace?: string, context?: string) {
    // Always show errors
    super.error(message, trace, context);
  }
}

async function bootstrap() {
  console.log('📍 Starting application bootstrap...');
  const expressAdapter = new ExpressAdapter();

  // Alternative: Completely disable websocket support
  const expressInstance = expressAdapter.getInstance();

  // Override the default upgrade handler to prevent websocket connections
  expressInstance.on('upgrade', (req: unknown, socket: Socket) => {
    // Silently close websocket connections
    void req;
    socket.end();
  });

  try {
    console.log('📍 Creating NestJS application...');
    const app = await NestFactory.create(AppModule, expressAdapter, {
      logger: new FilteredLogger(),
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
