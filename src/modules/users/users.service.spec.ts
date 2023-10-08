import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
    CryptographServiceMock,
    EmitterMock,
} from "../../core/constants/core.mock";
import { CryptographService } from "../../core/utils/cryptograph/cryptograph.service";
import { rolesServiceMock } from "../roles/constants/roles.mock";
import { RolesService } from "../roles/roles.service";
import { UserSaveEvent } from "./constants/user.event";
import { createUserDto, userRepositoryMock } from "./constants/user.mock";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
    let service: UsersService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
                { provide: RolesService, useValue: rolesServiceMock },
                { provide: EventEmitter2, useValue: EmitterMock },
                {
                    provide: CryptographService,
                    useValue: CryptographServiceMock,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("UsersService.create: should create", async () => {
        const isUniqueSpy = jest.spyOn(service, "isUnique");
        const user = await service.create(createUserDto);
        expect(isUniqueSpy).toHaveBeenCalledWith(createUserDto.email);
        expect(CryptographServiceMock.b_hash).toBeCalled();
        expect(userRepositoryMock.create).toBeCalledWith(createUserDto);
        expect(EmitterMock.emit).toBeCalledWith(UserSaveEvent, user);
    });
});
