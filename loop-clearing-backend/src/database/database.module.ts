import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './database.provider';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, load: [typeorm]
    }), // Make ConfigModule global
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
  ],
})
export class DatabaseModule { }
