import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserSaveEvent } from "../constants/user.event";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersListener {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) {}

    @OnEvent(UserSaveEvent, { async: true })
    async save(payload: User) {
        await this.repository.save(payload);
    }
}
