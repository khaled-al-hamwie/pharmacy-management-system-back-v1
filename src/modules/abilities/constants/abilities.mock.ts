import { FindManyOptions } from "typeorm";
import { CreateAbilityDto } from "../dto/create-ability.dto";
import { Ability } from "../entities/ability.entity";

export const createAbilityDtoMock: CreateAbilityDto = {
    name: "stuff",
    role_id: "some-uuid",
    describtion: "some description",
};

export const abilitiesDbMock: Ability[] = [
    {
        ability_id: "6d6d32d7-41f5-46ec-b772-41d8cf4a59ef",
        name: "exist",
        describtion: "some stuff",
        deleted_at: null,
        role: null, // Make sure to replace null with actual relation data if needed
        user_abilities: null, // Make sure to replace null with actual relation data if needed
    },
];

export const abilityRepositoryMock = {
    save: jest.fn(),
    create: jest.fn((x) => x),
    findOne: jest.fn((options: FindManyOptions<Ability>) =>
        abilitiesDbMock.find((ability) => {
            const w = options.where;
            for (const key in w) {
                return ability[key] == w[key];
            }
        })
    ),
    softRemove: jest.fn(),
};

export const abilitiesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(() => abilitiesDbMock),
    findOne: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};
