import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

interface RequestWithUser extends Request{
    user:{
        email: string;
        role: string;
    }
}
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}


    @Post('register')
        register(
            @Body()
            registerDto:RegisterDto,
            
        ){  
            console.log(registerDto)
            return this.authService.register(registerDto);
        }
        
    @Post('login')
    login(
        @Body()
        loginDto:LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Get ('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface){
        return this.authService.profile(user);
    }
}
