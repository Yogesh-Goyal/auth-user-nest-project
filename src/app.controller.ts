import { Body, Controller, Get,Post,UseGuards,Request,UsePipes, ValidationPipe, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/user-jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/login-auth.guard';
import { CreateLoginDto, CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly userService: UsersService,
              private readonly authService : AuthService ) {}

  @Post('register')
  @ApiResponse({ status: 201, description : "access_token, User Data, Added Successfully" })
  @ApiResponse({ status: 400, description : "email must be an email , firstname should not be empty , password must be longer than or equal to 6 characters" })
  @UsePipes(new ValidationPipe())
  async addUser( @Body() CreateUserDto: CreateUserDto
  )  {
    return this.userService.addUser(CreateUserDto.email,CreateUserDto.firstname,CreateUserDto.lastname || '',CreateUserDto.password);
  }

  // @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description : "access_token : string" })
  @ApiResponse({ status: 401, description : "Unauthorized" })
  @Post('login')
  async login(@Body() createloginData : CreateLoginDto, @Request() req) {
    const verify = await this.authService.validateUser(createloginData.email,createloginData.password);
    if( verify )
    return this.authService.login(createloginData.email);
    else
      throw new UnauthorizedException();
  };

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description : "User Data" })
  @ApiResponse({ status: 401, description : "Unauthorized" })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getProfile(@Request() req) {
    return req.user;
  }

}
