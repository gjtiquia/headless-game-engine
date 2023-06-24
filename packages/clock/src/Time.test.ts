import { Time } from "./index"

describe("Time", () => {

    beforeEach(() => {
        Time.resetToDefaultValues();
    })

    it("should reset to default values when called", () => {
        Time.tickRate = 0;
        Time.resetToDefaultValues();
        expect(Time.tickRate).not.toBe(0);
    })

    it("should calculate Time.fixedDeltaTime correctly", () => {
        Time.tickRate = 0.5;
        expect(Time.fixedDeltaTime).toBe(2);

        Time.tickRate = 2;
        expect(Time.fixedDeltaTime).toBeCloseTo(0.5);
    })

    it("should throw an error if trying to get the delta time while the tick rate is zero", () => {
        Time.tickRate = 0;
        expect(() => Time.fixedDeltaTime).toThrowError();
    })

    it("should not throw an error if getting the fixed delta time while the tick rate is greater than zero", () => {
        expect(() => Time.fixedDeltaTime).not.toThrowError();
    })
})