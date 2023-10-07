import { Test, TestingModule } from "@nestjs/testing";
import { createRoleDto, rolesServiceMock } from "./constants/roles.mock";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

describe("RolesController", () => {
    let controller: RolesController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [{ provide: RolesService, useValue: rolesServiceMock }],
        }).compile();

        controller = module.get<RolesController>(RolesController);
    });

    it("RolesController: should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("RolesController.create: should call create", async () => {
        await controller.create(createRoleDto);
        expect(rolesServiceMock.create).toBeCalledWith(createRoleDto);
        expect(rolesServiceMock.create).toBeCalledTimes(1);
    });
});
