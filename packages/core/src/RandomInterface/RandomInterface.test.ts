import { RandomInterface, RandomInterfaceMethod2 } from "./RandomInterface";

describe("Testing RandomInterface", () => {

    let randomObject: RandomInterface;

    beforeEach(() => {
        randomObject = { message: "helloWorld" }
    })

    it("Has message property", () => {
        expect(randomObject).toHaveProperty("message");
    });

    it("Has correct message value", () => {
        expect(randomObject.message).toStrictEqual("helloWorld");
    });

    test("method 2", () => {
        expect(RandomInterfaceMethod2()).toStrictEqual("method 2");
    });
})