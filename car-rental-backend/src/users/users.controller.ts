import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserParam } from '../auth/user-param.decorator';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) {}
        
    @Post()
    async create(@Body() userAuthDto: UserAuthDto) {
        try {
            const user = await this.userService.create(userAuthDto);
            return new UserDto(user);
        } catch (e) {
            if (e instanceof UniqueConstraintViolationException) {
                throw new HttpException('Username is already in use.', HttpStatus.CONFLICT);
            } else {
                throw e;
            }
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@UserParam() user: UserDto) {
        return user;
    };
}
        