import { EntityRepository } from "@mikro-orm/knex";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";
import { User, UserRole } from "./entities/user";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private authService: AuthService,
    ) {}

    async create(userAuthDto: UserAuthDto) {
        const user = new User();
        user.name = userAuthDto.name;
        user.userName = userAuthDto.userName;
        user.role = UserRole.User;
        user.password = await this.authService.hashPassword(userAuthDto.password);

        await this.userRepository.persistAndFlush(user);
        return user;
    }
}
