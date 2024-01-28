
import { Controller, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller('user')
export class UserController {
    constructor(
        private usersService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('info/:username')
    info(@Param('username') username: string) {
        console.log('info of', { username });
        return this.usersService.find_one(username);
    }
}