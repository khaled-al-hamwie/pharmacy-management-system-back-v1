import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { roleRepositoryMock } from "../constants/roles.mock";
import { Role } from "../entities/role.entity";
import { RolesListener } from "./roles.listener";

describe("RolesListener", () => {
    let provider: RolesListener;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesListener,
                {
                    provide: getRepositoryToken(Role),
                    useValue: roleRepositoryMock,
                },
            ],
        }).compile();

        provider = module.get<RolesListener>(RolesListener);
    });

    it("should be defined", () => {
        expect(provider).toBeDefined();
    });

    it("should call the save method of the repository with the correct payload", async () => {
        const payload = new Role();
        await provider.save(payload);
        expect(roleRepositoryMock.save).toHaveBeenCalledWith(payload);
    });
});
