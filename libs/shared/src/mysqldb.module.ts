import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_MYSQL_HOST'),
        port: parseInt(configService.get('DATABASE_MYSQL_PORT')),
        username: configService.get('DATABASE_MYSQL_USER'),
        password: configService.get('DATABASE_MYSQL_PASSWORD'),
        database:configService.get('DATABASE_MYSQL_DB'),
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    
  ],
 
})
export class MysqlDBModule {}
