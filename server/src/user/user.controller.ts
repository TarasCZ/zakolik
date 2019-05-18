import { Controller, Get, Post, Body } from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.interface';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
    }

    @Post('update')
    async update(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
    }

    @Get('getAll')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
