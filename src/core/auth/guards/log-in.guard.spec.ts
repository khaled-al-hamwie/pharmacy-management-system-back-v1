import { LogInGuard } from "./log-in.guard";

describe("LogInGuard", () => {
    it("should be defined", () => {
        expect(new LogInGuard()).toBeDefined();
    });
});
