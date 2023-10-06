import { Test, TestingModule } from "@nestjs/testing";
import { RolesListener } from "./roles.listener";

describe("RolesListener", () => {
    let provider: RolesListener;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesListener],
        }).compile();

        provider = module.get<RolesListener>(RolesListener);
    });

    it("should be defined", () => {
        expect(provider).toBeDefined();
    });
});
