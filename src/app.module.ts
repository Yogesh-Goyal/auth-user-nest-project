import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CreateLoginDto, CreateUserDto } from './dtos/create-user.dto';
import { userModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth_user'),
    userModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [CreateUserDto,CreateLoginDto],
})
export class AppModule {}
