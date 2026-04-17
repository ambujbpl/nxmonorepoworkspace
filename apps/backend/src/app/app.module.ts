import dns from 'node:dns';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const mongoLogger = new Logger('MongoDB');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/my-monorepo';

        if (uri.startsWith('mongodb+srv://')) {
          dns.setServers(['8.8.8.8', '1.1.1.1']);
        }

        return {
          uri,
          lazyConnection: true,
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
          socketTimeoutMS: 5000,
          retryWrites: false,
          family: 4,
          onConnectionCreate: (connection) => {
            connection.on('connected', () => {
              mongoLogger.log('MongoDB connected on first use');
            });

            connection.on('disconnected', () => {
              mongoLogger.warn('MongoDB disconnected');
            });

            connection.on('error', (error: Error) => {
              mongoLogger.error(`MongoDB connection error: ${error.message}`);
            });
          },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
