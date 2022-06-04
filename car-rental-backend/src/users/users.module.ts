import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { Rental } from  '../rentals/entities/rental';
import { User } from './entities/user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [User, Rental] }), AuthModule],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
})
export class UsersModule {}
