import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresDBModule } from '@app/shared/postgresdb.module';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    SharedModule,
    PostgresDBModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
