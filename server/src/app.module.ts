import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './services/jwtconfig.service';
import { AppsService } from './services/apps.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthGuard } from './guards/auth.guard';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useClass: JwtConfigService,
            inject: [],
            extraProviders: [AppsService]
        })
    ],
    controllers: [AuthController, UserController],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
        AuthService,
        AppsService,
        UsersService,
    ],
})
export class AppModule { }
