import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EmitterMock } from "../../core/constants/core.mock";
import { AbilitiesService } from "./abilities.service";
import {
    abilitiesDbMock,
    abilityRepositoryMock,
    createAbilityDtoMock,
} from "./constants/abilities.mock";
import { Ability } from "./entities/ability.entity";

describe("AbilitiesService", () => {
    let service: AbilitiesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AbilitiesService,
                {
                    provide: getRepositoryToken(Ability),
                    useValue: abilityRepositoryMock,
                },
                { provide: EventEmitter2, useValue: EmitterMock },
            ],
        }).compile();

        service = module.get<AbilitiesService>(AbilitiesService);
    });

    it("AbilitiesService: should be defined", () => {
        expect(service).toBeDefined();
    });

    it("AbilitiesService.findOne: should not return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "khaled" },
        });
        expect(result).toBeUndefined();
    });

    it("AbilitiesService.findOne: should return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "exist" },
        });
        expect(result).toEqual(abilitiesDbMock[0]);
    });

    it("AbilitiesService.isUnique: should not throw when unique", async () => {
        const ability = await service.isUnique("name");
        expect(ability).toBeTruthy();
    });

    it("AbilitiesService.isUnique: should throw when not unique", async () => {
        await expect(() => service.isUnique("exist")).rejects.toThrow();
    });

    it("AbilitiesService.create: should create", async () => {
        const isUniqueSpy = jest.spyOn(service, "isUnique");
        const ability = await service.create(createAbilityDtoMock);
        expect(isUniqueSpy).toHaveBeenCalledWith(createAbilityDtoMock.name);
        expect(abilityRepositoryMock.create).toBeCalledWith(
            createAbilityDtoMock
        );
        expect(EmitterMock.emit).toBeCalled();
        expect(ability).toBe(createAbilityDtoMock);
    });

    it("AbilitiesService.findById: should return id", async () => {
        const ability_id = abilitiesDbMock[0].ability_id;
        const ability = await service.findById(ability_id);
        expect(ability).toBe(abilitiesDbMock[0]);
    });

    it("AbilitiesService.findById: should throw error when ability not exist", async () => {
        const ability_id = abilitiesDbMock[0].ability_id + "jfls";
        await expect(() => service.findById(ability_id)).rejects.toThrow();
    });

    it("AbilitiesService.update: should update", async () => {
        const isUniqueSpy = jest.spyOn(service, "isUnique");
        const ability = await service.update(
            abilitiesDbMock[0],
            createAbilityDtoMock
        );
        expect(isUniqueSpy).toHaveBeenCalledWith(createAbilityDtoMock.name);
        expect(EmitterMock.emit).toBeCalled();
        expect(ability.name).toBe(createAbilityDtoMock.name);
    });

    it("AbilitiesService.remove: should remove", async () => {
        const ability = new Ability();
        const res = await service.remove(ability);
        expect(abilityRepositoryMock.softRemove).toBeCalledWith(ability);
        expect(res.message).toBe("ability has beend deleted succsesfully");
    });
});
