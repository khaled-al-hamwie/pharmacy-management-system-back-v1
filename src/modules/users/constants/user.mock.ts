import { CreateUserDto } from "../dto/create-user.dto";

export const userRepositoryMock = {
    save: jest.fn(),
    create: jest.fn((x) => x),
    findOne: jest.fn(),
    softRemove: jest.fn(),
};

export const createUserDto: CreateUserDto = {
    role_id: "11223344",
    first_name: "bla",
    last_name: "bla",
    email: "bla@gmail",
    password: "blabla",
};

export const usersServiceMock = {
    create: jest.fn((x) => x),
};
