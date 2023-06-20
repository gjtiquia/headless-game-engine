import { RandomInterface } from "./RandomInterface";

describe("Testing RandomInterface AGAIN", () => {

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
})