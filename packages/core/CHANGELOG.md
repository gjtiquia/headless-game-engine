# @headless-game-engine/core

## 0.2.0

### Minor Changes

- 3de52bd: Added Systems to the core package. Created clock and physics-2d packages.

  Systems in the core package allows for writing games using the ECS architecture.
  Writing with the ECS architecture is not required however, and the regular GameObject-Component workflow can still be applied.

  Other methods are added as well, including

  - Component

    - getComponent
    - onDestroy

  - GameEngine

    - activeScene
    - destroy
    - getComponents

  - GameObject

    - destroy
    - getComponent
    - getAbstractComponent
      - especially useful for getting a component that inherits from an abstract class
    - hasComponent

  - Scene

    - destroy
    - getComponents
    - getAbstractComponents
    - getSystem

  - utils
    - sign
    - clamp

## 0.1.1

### Patch Changes

- 589ee4c: Added documentation and removed the CHANGELOG.md from the files to be included in the package.

## 0.1.0

### Minor Changes

- 48534d5: A basic game engine with an ECS structure with Game Objects and Components.
