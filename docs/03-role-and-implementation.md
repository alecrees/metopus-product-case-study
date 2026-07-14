# Role and implementation decisions

## Role

Founder and product developer at Metopida Ltd.

My work on Metopus includes:

- turning industry problems into product requirements
- product scope, roadmap and commercial planning
- information architecture, UX and original visual design
- web, mobile and shared-logic architecture
- implementation, integration and code review
- Supabase-backed workflow and infrastructure planning
- performance profiling and real-device testing
- accessibility, age-safety and capability-boundary work
- technical documentation and cross-session handoff material

## From Flutter MVP to native clients

The Flutter MVP was useful because it made a wide feature set testable early. It also provided a concrete reference for product structure and interaction rather than leaving the idea in documents.

The later move to native clients was driven by the product's graphics, device integration and interaction requirements:

- Kotlin and Jetpack Compose for Android
- SwiftUI for the iOS parity port
- Rust for behaviour that should remain consistent across clients
- WGPU/WGSL for performance-sensitive original visual systems

The iOS work is a port in progress, not a claim that every Android screen has already reached parity.

## Shared rules rather than three copies

Client-only tables and rules can drift. The preferred direction is:

```text
interface
  -> typed action or shared rule
  -> validation and permission decision
  -> data/API operation
  -> result rendered by the client
```

The same principle supports both native clients and later AI workflows. An assistant should propose the same validated actions used by the interface rather than invent a separate route around the product.

## Visual-system ownership

The card treatments, cellular navigation and spiral/orbit motion language are original product design work. AI tools have helped with implementation, boilerplate, debugging and alternative approaches, but the underlying design, interaction intent and acceptance decisions are human-owned.

## Documentation as engineering work

The project includes architecture plans, migration notes, feature specifications, test logs, safety audits and implementation handoffs. These documents are used to keep decisions traceable across a product spanning web, Android, iOS, Rust, graphics and backend work.

This repository is the concise review layer. It does not publish the private planning archive.
