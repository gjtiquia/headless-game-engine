import { TestTypeScript } from ".";

describe("Testing HelloTypeScript", () => {
    it("Has message property", () => {
        const someString: string = "Hello TypeScript!";

        expect(someString).toStrictEqual("Hello TypeScript!");
    });
})