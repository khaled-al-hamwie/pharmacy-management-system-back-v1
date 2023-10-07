import { Test, TestingModule } from "@nestjs/testing";
import {
    createRoleDto,
    rolesDbMock,
    rolesServiceMock,
} from "./constants/roles.mock";
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

    it("RolesController.findAll: should return roles", async () => {
        const roles = await controller.findAll();
        expect(rolesServiceMock.findAll).toBeCalledTimes(1);
        expect(roles).not.toBeNull();
    });

    it("RolesController.findAll: should throw error when no roles exist", async () => {
        const role = rolesDbMock.pop();
        await expect(() => controller.findAll()).rejects.toThrowError();
        rolesDbMock.push(role);
    });

    it("RolesController.findOne: should call the role service find by id", async () => {
        await controller.findOne("1234");
        expect(rolesServiceMock.findById).toBeCalledWith("1234");
    });
});
