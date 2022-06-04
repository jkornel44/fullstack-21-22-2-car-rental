import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '../users/entities/user';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] }), PassportModule],
  providers: [AuthService, LocalStrategy, JwtService]
})
export class AuthModule {}
