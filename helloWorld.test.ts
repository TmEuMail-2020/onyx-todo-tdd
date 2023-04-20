import { helloWorld } from "./helloWorld";

describe("helloWorld", () => {
    it("should return hello world", () => {
        expect(helloWorld()).toBe("Hello World");
    });
});

