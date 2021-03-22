import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
          },
          firstName : {
            type: String,
            required: true
          },
          secondName : {
            type: String
          },
          password :{
            type: String,
            required: true
          }

        },
{ timestamps: true });


export interface user extends mongoose.Document {
        email : String,
        firstName : String,
        secondName : String,
        password : String
}
