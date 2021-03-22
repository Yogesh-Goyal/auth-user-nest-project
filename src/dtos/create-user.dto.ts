import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength,IsNotEmpty,IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstname:string;

  @IsOptional()
  lastname:string;

  @MinLength(6)
  password: string;
}
export class CreateLoginDto{

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  
}