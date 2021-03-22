import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor( 
        private readonly userService : UsersService,
        private readonly jwtService : JwtService 
    ) {}

    async validateUser(email: string, pass: string) : Promise<any> {
        const user = await this.userService.getUser(email);
        if(user ){
          const check =  await bcrypt.compare(pass, user.password);
          if(check){
            const {...result} = user;
            return result; 
            }
            else{
              return null;
            }
          }
        return null;
      }

    async login(emailAddress: string) {
        const payload = { email: emailAddress };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}   