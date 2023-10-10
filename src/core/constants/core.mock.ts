import { CryptographService } from "../utils/cryptograph/cryptograph.service";

export const EmitterMock = {
    emit: jest.fn(),
};

export const CryptographServiceMock: CryptographService = {
    compare: jest.fn((x, y) => Promise.resolve(x == y)),
    b_hash: jest.fn(),
};

export const JJwtServiceMock = {
    signToken: jest.fn(),
};
