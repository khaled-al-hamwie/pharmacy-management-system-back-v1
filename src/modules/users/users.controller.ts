import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne({});
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: CreateUserDto) {
        // return this.usersService.update(+id, updateUserDto);
        return this.usersService.create(updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
