import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { userRepositoryMock } from "../constants/user.mock";
import { User } from "../entities/user.entity";
import { UsersListener } from "./users.listener";

describe("UsersListener", () => {
    let provider: UsersListener;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersListener,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
            ],
        }).compile();

        provider = module.get<UsersListener>(UsersListener);
    });

    it("UsersListener: should be defined", () => {
        expect(provider).toBeDefined();
    });

    it("UsersListener: should call the save method of the repository with the correct payload", async () => {
        const payload = new User();
        await provider.save(payload);
        expect(userRepositoryMock.save).toHaveBeenCalledWith(payload);
    });
});
