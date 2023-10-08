import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    register(@Body() createAuthDto: CreateUserDto) {
        return this.authService.register(createAuthDto);
    }
}
