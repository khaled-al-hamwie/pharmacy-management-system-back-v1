import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { LoginUserDto } from "../../modules/users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { LogInGuard } from "./guards/log-in.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() createAuthDto: CreateUserDto) {
        return this.authService.register(createAuthDto);
    }

    @Get("login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
