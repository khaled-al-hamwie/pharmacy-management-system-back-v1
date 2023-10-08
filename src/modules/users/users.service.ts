import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CryptographService } from "../../core/utils/cryptograph/cryptograph.service";
import { RolesService } from "../roles/roles.service";
import { UserSaveEvent } from "./constants/user.event";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { userForbiddenException } from "./exceptions/user.forbidden.exception";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly rolesService: RolesService,
        private readonly cryptographService: CryptographService,
        private readonly eventEmitter: EventEmitter2
    ) {}
    async create(createUserDto: CreateUserDto) {
        const role = await this.rolesService.findById(createUserDto.role_id);
        await this.isUnique(createUserDto.email);
        const password = await this.cryptographService.b_hash(
            createUserDto.password
        );
        const user = this.repository.create(createUserDto);
        user.role = role;
        user.password = password;
        this.eventEmitter.emit(UserSaveEvent, user);
        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(options: FindOneOptions<User>) {
        return this.repository.findOne(options);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async isUnique(email: string) {
        const user = await this.findOne({ where: { email } });
        if (user) throw new userForbiddenException(email);
        return true;
    }
}
