import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { user } from "./user.model";
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UsersService {


    constructor( @InjectModel('user')  private readonly userModel : Model<user> ,
                    private readonly jwtService : JwtService){}


    async getUser(email : string ): Promise< user | undefined> {
        return this.userModel.findOne({ email : email});
    }



    async addUser(email : string, firstName : string, secondName : string, password : string){
        await bcrypt.hash(password, saltRounds).then(hash =>{
            password = hash;
          });
        const user1 = new this.userModel(
            {
                email,firstName,secondName,password
            }
        )
        await user1.save();
        const data = await this.getUser(email);
        data.password = undefined;
        const payload = { email: user1.email };
        const access_token =  this.jwtService.sign(payload);
        return {  
                access_token,
                "data" : data,
                "message" : 'Added Successfully'};
    }

}   