import { Test, TestingModule } from "@nestjs/testing";
import {
    createUserDto,
    usersServiceMock,
} from "../../modules/users/constants/user.mock";
import { UsersService } from "../../modules/users/users.service";
import {
    CryptographServiceMock,
    JJwtServiceMock,
} from "../constants/core.mock";
import { CryptographService } from "../utils/cryptograph/cryptograph.service";
import { JJwtService } from "../utils/jwt/j-jwt.service";
import { AuthService } from "./auth.service";
import { CredentailsDontMatchException } from "./exceptions/credentails-dont-match.exception";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: usersServiceMock },
                { provide: JJwtService, useValue: JJwtServiceMock },
                {
                    provide: CryptographService,
                    useValue: CryptographServiceMock,
                },
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

    it("AuthService.checkEmail: should return user when it find one", async () => {
        const user = await service.checkEmail("found@gmail.com");
        expect(user.password).toBe("bla");
    });

    it("AuthService.checkEmail: should throw error when user not found", async () => {
        await expect(() =>
            service.checkEmail("no@gmail.com")
        ).rejects.toThrowError(CredentailsDontMatchException);
    });

    it("AuthService.checkPassword: should return true when password match", async () => {
        const user = await service.checkPassword("bla", "bla");
        expect(user).toBeTruthy();
    });

    it("AuthService.checkPassword: should throw error when password dont match", async () => {
        await expect(() =>
            service.checkPassword("bla", "no")
        ).rejects.toThrowError(CredentailsDontMatchException);
    });

    it("AuthService.login: should login ", async () => {
        const checkEmailSpy = jest.spyOn(service, "checkEmail");
        const checkPassowdSpy = jest.spyOn(service, "checkPassword");
        await service.login({ email: "found@gmail.com", password: "bla" });
        expect(checkEmailSpy).toBeCalledWith("found@gmail.com");
        expect(checkPassowdSpy).toBeCalledWith("bla", "bla");
        expect(JJwtServiceMock.signToken).toBeCalled();
    });
});
