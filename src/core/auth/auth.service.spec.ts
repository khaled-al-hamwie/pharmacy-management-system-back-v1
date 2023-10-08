import { Test, TestingModule } from "@nestjs/testing";
import {
    createUserDto,
    usersServiceMock,
} from "../../modules/users/constants/user.mock";
import { UsersService } from "../../modules/users/users.service";
import { JJwtServiceMock } from "../constants/core.mock";
import { JJwtService } from "../utils/jwt/j-jwt.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: usersServiceMock },
                { provide: JJwtService, useValue: JJwtServiceMock },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("AuthService.register: should create a user and sign token", () => {
        service.register(createUserDto);
        expect(usersServiceMock.create).toBeCalledWith(createUserDto);
    });
});
