import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UsersModule,
    AuthModule,
    ReviewModule,
    MovieModule,
  ],
})
export class AppModule {}
