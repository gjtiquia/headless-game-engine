
describe("Testing Hello World", () => {
    it("Has message property", () => {
        const someString: string = "hello world";

        expect(someString).toStrictEqual("hello world");
    });
})