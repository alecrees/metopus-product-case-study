# Role and Implementation

## Role

Founder and product developer.

My responsibilities include:

- product framing and feature planning
- interface direction and content strategy
- public website and artist-profile planning
- cross-platform architecture decisions
- front-end implementation and testing
- native mobile planning across Android and iOS
- shared Rust logic direction
- Supabase-backed workflow planning and integration
- AI-assisted development workflow design
- QA, debugging, device testing and iteration

## Implementation Areas

### Product and Requirements

Metopus began as a direct-to-fan product idea and has developed into a wider system covering public discovery, artist-owned audience capture, mobile app experiences, artist tools and shared product logic.

The useful implementation evidence is not simply the size of the codebase. It is the ability to keep the product coherent while splitting work across public web, authenticated app surfaces, native clients, shared logic and backend infrastructure.

### Public Web and Content

The public web surface is designed to explain the product, give artists and fans clear entry points, and support public artist profiles that can be shared, indexed and linked from real-world campaigns.

Key concerns:

- clear public copy
- responsive layout
- SEO and social sharing
- artist profile structure
- mailing-list capture
- public/private data boundaries
- accessibility and mobile behaviour

### Cross-Platform App Direction

The product explores separate web, Android and iOS surfaces rather than forcing every workflow into one framework.

Reasons:

- native clients can provide better performance and device integration
- web remains useful for public discovery, artist tooling and lightweight access
- shared logic reduces duplicated behaviour where consistency matters
- each surface can be scoped around the job it does best

### Testing and Device Coverage

The project has involved practical testing across multiple Android and iOS devices, including older and newer hardware. This matters because visual systems, animation, navigation, auth and app startup behaviour often fail differently across real devices than they do in a single simulator or desktop browser.

Public-safe testing discussion can include:

- responsive layout checks
- native-device checks
- visual parity checks
- performance profiling at a high level
- browser compatibility and fallback decisions
- launch-context metrics where evidence is available

### Documentation and Handoff

A large amount of project work exists as planning, implementation notes, migration plans, QA notes and technical handoff material. That documentation is part of the product work: it keeps complex cross-platform decisions traceable and makes the system more maintainable.

This public case study should act as a clean summary layer, not a dump of private planning documents.
