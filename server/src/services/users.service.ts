import { Injectable } from "@nestjs/common";
import * as users from 'src/data/users.json';

@Injectable()
export class UsersService {

    readonly users;

    constructor() {
        console.log({ users });
        this.users = users;
    }

    async find_one(username: string) {
        return this.users[username];
    }
}
