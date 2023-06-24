import { Clock } from "../src"

describe("Clock", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'setTimeout');
    })

    afterEach(() => {
        jest.clearAllTimers();
    })

    it("should raise error if trying to start while clock is running", () => {
        const clock = new Clock(() => { }, 1000);
        clock.start();

        expect(clock.isRunning).toBe(true);
        expect(() => clock.start()).toThrowError();
    })

    it("should not raise error if starting the clock again after stopping", () => {
        const clock = new Clock(() => { }, 1000);

        clock.start();
        expect(clock.isRunning).toBe(true);

        clock.stop();
        expect(clock.isRunning).toBe(false);

        expect(() => clock.start()).not.toThrowError();
    })

    it("should work properly with a dummy counter", () => {
        let count = 0;
        const clock = new Clock(() => { count++ }, 1000);
        clock.start();

        jest.advanceTimersByTime(3500);

        clock.stop();
        expect(count).toBe(4); // initial 1 + 1 for each second x 3 seconds
    }, 10000)
})