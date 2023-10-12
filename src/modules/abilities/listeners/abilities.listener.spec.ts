import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Ability } from "../entities/ability.entity";
import { AbilitysListener } from "./abilities.listener";

// Mock repository object
const abilityRepositoryMock = {
    save: jest.fn(),
};

describe("AbilitysListener", () => {
    let provider: AbilitysListener;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AbilitysListener,
                {
                    provide: getRepositoryToken(Ability),
                    useValue: abilityRepositoryMock,
                },
            ],
        }).compile();

        provider = module.get<AbilitysListener>(AbilitysListener);
    });

    it("AbilitysListener: should be defined", () => {
        expect(provider).toBeDefined();
    });

    it("AbilitysListener: should call the save method of the repository with the correct payload", async () => {
        const payload = new Ability();
        await provider.save(payload);
        expect(abilityRepositoryMock.save).toHaveBeenCalledWith(payload);
    });
});
