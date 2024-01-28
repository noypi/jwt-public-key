import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory, JwtSecretRequestType } from "@nestjs/jwt";
import { type Algorithm } from 'jsonwebtoken';
import * as fs from 'fs';
import * as crypto from 'crypto';

import { AppsService } from "src/services/apps.service";
import config from "src/config";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    readonly private_key;

    constructor(
        readonly appsService: AppsService
    ) {
        const private_key_buf = fs.readFileSync(config.auth.private_key_file, 'utf8');
        //this.private_key = this.read_private_key(private_key_buf);
        this.private_key = crypto.createPrivateKey(private_key_buf);
    }

    createJwtOptions(): JwtModuleOptions {
        const opts = {
            secretOrKeyProvider: this.seret_key_provider.bind(this),
            signOptions: {
                algorithm: <Algorithm>'ES256', // ECDSA
                // algorithm: 'RS256', // RSA
                expiresIn: '60d',
            },
            verifyOptions: {
                algorithms: [<Algorithm>'ES256']
            }
        };

        console.log('jwt opts', { opts });

        return opts;
    }

    async seret_key_provider(
        requestType: JwtSecretRequestType,
        token: string
    ) {
        switch (requestType) {
            case JwtSecretRequestType.SIGN:
                return this.private_key;
            case JwtSecretRequestType.VERIFY:
                const payload = this.extract_payload(token);
                return this.appsService.get_public_key(payload.issuer);
            default:
                // when using secret
        }
    }

    read_private_key(key: string) {
        return key.replace('-----BEGIN PRIVATE KEY-----', '')
            .replace('-----END PRIVATE KEY-----', '')
            .replaceAll(/\s/g, '');
    }

    extract_payload(token: string) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }
}


