import { TestTypeScript } from ".";

describe("Testing HelloTypeScript", () => {
    it("Has message property", () => {
        const someString: string = TestTypeScript;

        expect(someString).toStrictEqual("Hello TypeScript!");
    });
})