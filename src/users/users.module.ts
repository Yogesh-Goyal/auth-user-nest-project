import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { userSchema } from './user.model';
import { UsersService } from './users.service';
import { jwtConstants } from 'src/auth/constants';

@Module({
    imports:[
        MongooseModule.forFeature([
        { name : 'user', schema : userSchema }
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })
    ],
    providers : [UsersService],
    exports : [UsersService]
})
export class userModule {}