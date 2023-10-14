import { Test, TestingModule } from "@nestjs/testing";
import { AbilitiesController } from "./abilities.controller";
import { AbilitiesService } from "./abilities.service";
import {
    abilitiesDbMock,
    abilitiesServiceMock,
    createAbilityDtoMock,
} from "./constants/abilities.mock";

describe("AbilitiesController", () => {
    let controller: AbilitiesController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AbilitiesController],
            providers: [
                { provide: AbilitiesService, useValue: abilitiesServiceMock },
            ],
        }).compile();

        controller = module.get<AbilitiesController>(AbilitiesController);
    });

    it("AbilitiesController: should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("AbilitiesController.create: should call create", async () => {
        await controller.create(createAbilityDtoMock);
        expect(abilitiesServiceMock.create).toBeCalledWith(
            createAbilityDtoMock
        );
        expect(abilitiesServiceMock.create).toBeCalledTimes(1);
    });

    it("AbilitiesController.findAll: should return abilities", async () => {
        const abilities = await controller.findAll();
        expect(abilitiesServiceMock.findAll).toBeCalledTimes(1);
        expect(abilities).not.toBeNull();
    });

    it("AbilitiesController.findAll: should throw error when no abilities exist", async () => {
        const ability = abilitiesDbMock.pop();
        await expect(() => controller.findAll()).rejects.toThrowError();
        abilitiesDbMock.push(ability);
    });

    it("AbilitiesController.findOne: should call the ability service find by id", async () => {
        await controller.findOne("1234");
        expect(abilitiesServiceMock.findById).toBeCalledWith("1234");
    });

    it("AbilitiesController.update: should call the ability service update", async () => {
        await controller.update("1234", { name: "k", role_id: "some-uuid" });
        expect(abilitiesServiceMock.findById).toBeCalledWith("1234");
        expect(abilitiesServiceMock.update).toBeCalled();
    });

    it("AbilitiesController.remove: should call the ability remove update", async () => {
        await controller.remove("1234");
        expect(abilitiesServiceMock.findById).toBeCalledWith("1234");
        expect(abilitiesServiceMock.remove).toBeCalled();
    });
});
