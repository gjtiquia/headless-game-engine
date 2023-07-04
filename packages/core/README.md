# Headless Game Engine - Core

A minimalistic, framework-agnostic JavaScript game engine.

This is the core package for the Headless Game Engine.

Other packages are completely optional. It is highly encouraged to extend directly from the core package for creating custom solutions for your game.

Contains

- Component
- GameObject
- System
- Scene
- GameEngine

The GameEngine runs the scene.

Scene contains GameObjects and Systems.

GameObjects contains Components.

Systems can be optionally used to drive the components if an ECS architecture is desired.

Components and Systems can be easily extended.
