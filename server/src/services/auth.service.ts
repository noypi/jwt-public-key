import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users.service';
import * as fs from 'fs';
import * as crypto from 'crypto';
import config from 'src/config';

@Injectable()
export class AuthService {

    readonly private_key;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        const private_key_buf = fs.readFileSync(config.auth.private_key_file);
        //this.private_key = this.read_private_key(private_key_buf);
        this.private_key = crypto.createPrivateKey(private_key_buf);
    }

    async sign_in(
        username: string,
        password: string,
    ): Promise<any> {
        const user = await this.usersService.find_one(username);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.username,
            issuer: config.app_name,
        };
        console.log('signing payload', { payload });
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: user.username,
        };
    }

    read_private_key(key: string) {
        return key.replace('-----BEGIN PRIVATE KEY-----', '')
            .replace('-----END PRIVATE KEY-----', '')
            .replaceAll(/\s/g, '');
    }
}
