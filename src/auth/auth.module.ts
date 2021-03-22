import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { userModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/user-jwt.strategy';
import { LocalStrategy } from './strategy/login.strategy';

@Module({
    imports:[
        userModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        })
    ],
    providers : [AuthService,LocalStrategy,JwtStrategy],
    exports :[AuthService]
})
export class AuthModule {}