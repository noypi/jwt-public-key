import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as crypto from 'crypto';
import config from 'src/config';

@Injectable()
export class AppsService {
    readonly cache = {};
    readonly apps;

    constructor() {
        this.cache[config.app_name] = config.auth.public_key;
        _.mapValues(config.apps, 'name');
    }

    async get_public_key(name: string) {
        const pubkey = this.cache[name] ?? await this.get_app_public_key(name);
        return crypto.createPublicKey(pubkey);
    }

    async get_app_public_key(name: string) {
        const url = `${this.apps[name].url}${config.endpoints.pubkey}`;
        const key = await fetch(url);

        this.apps[name] = key;

        console.log('get_app_public_key', { key });
        return key;
    }
}