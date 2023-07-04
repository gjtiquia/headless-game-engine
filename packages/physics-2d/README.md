# Headless Game Engine - Physics 2D

A minimalistic, framework-agnostic JavaScript game engine.

This is the Physics 2D package for the Headless Game Engine.

Contains

- Collider2D
- BoxCollider2D
- Rigidbody2D
- PhysicsSystem2D

BoxCollider2D is an AABB collider that extends from abstract class Collider2D.

Rigidbody2D is capable of adding force to change its velocity, which changes its position.

PhysicsSystem2D does 3 things

1. Movement Integration

- Moves the rigidbodies according to their current velocity.

2. Collision Detection

- Detects collisions between colliders

3. Collision Resolution

- Resolve the collisions between rigidbodies and static colliders by displacing the rigidbody and changing its velocity.
