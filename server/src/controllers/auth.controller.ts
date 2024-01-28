
import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
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
    @Get('pubkey')
    pubkey() {
        console.log('get pubkey');
        return this.appsService.my_public_key();
    }
}