# Headless Game Engine - Clock

A minimalistic, framework-agnostic JavaScript game engine.

This is the clock package for the Headless Game Engine.

This package used to run the game engine in a fixed timestep, together with other time related utilities.

Contains

- Clock
- Time
- EngineClock

Clock is a wrapper for setInterval, with the difference being that it calls the callback at the beginning of the interval without waiting.

Time is a static class that holds the data needed for the EngineClock to run, for example the tick rate.

EngineClock makes use of the clock and runs the game engine in a fixed timestep according to Time.tickRate.
