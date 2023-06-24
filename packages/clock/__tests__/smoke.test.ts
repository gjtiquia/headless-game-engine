import { testFunction } from "../src"

describe("Smoke Test", () => {
    it("should work", () => {
        expect(testFunction()).toBeTruthy();
    })
})