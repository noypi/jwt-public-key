
import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import config from 'src/config';
import { AllowUnauthorizedRequest } from 'src/guards/allow_unauthorized';
import { AppsService } from 'src/services/apps.service';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private appsService: AppsService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @AllowUnauthorizedRequest()
    @Post('login')
    login(@Body() dto: Record<string, any>) {
        console.log('signing in', { dto });
        return this.authService.sign_in(dto.username, dto.password);
    }

    @AllowUnauthorizedRequest()
    @Get(config.endpoints.pubkey)
    pubkey() {
        return this.appsService.get_public_key(config.app_name);
    }
}