import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { RolesListener } from "./roles.listener";

const mockRepository = {
    save: jest.fn(),
};

describe("RolesListener", () => {
    let provider: RolesListener;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesListener,
                { provide: getRepositoryToken(Role), useValue: mockRepository },
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
        expect(mockRepository.save).toHaveBeenCalledWith(payload);
    });
});
