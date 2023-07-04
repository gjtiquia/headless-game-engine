---
"@headless-game-engine/core": minor
---

Added Systems to the core package. Created clock and physics-2d packages.

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
