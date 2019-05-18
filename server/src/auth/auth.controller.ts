import {Body, Controller, Get, Header, Param, Query, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async returnBlank(@Query('code') code, @Query('state') state): Promise<any> {
        console.log(code, state);
        return new Promise((res) => res('Blank'));
    }

    @Get('token')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        // this route is restricted by AuthGuard
        // JWT strategy
    }
}
