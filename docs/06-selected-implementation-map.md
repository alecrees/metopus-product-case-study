# Selected Implementation Map

This document gives a public-safe map of the Metopus implementation. It is not a source-code dump and intentionally avoids private implementation details, database schemas, service-role logic, admin routes and proprietary product mechanics.

## Public Web Surface

Purpose:

- explain the product
- support public artist discovery
- provide SEO-friendly public routes
- support mailing-list capture and campaign entry points
- hand users into app or signup journeys

Implementation profile:

- Next.js / React / TypeScript
- Cloudflare-oriented deployment using OpenNext and Wrangler
- public marketing and artist-profile routes
- email/capture-related worker deployment
- generated public sharing/preview assets where appropriate

Public-safe evidence:

- product messaging and public page structure
- artist profile and fan-capture strategy
- Cloudflare deployment approach
- SEO/social sharing considerations
- public copy, layout, responsive behaviour and route design

Not public:

- private production repository
- environment variables
- admin logic
- worker secrets
- private analytics or signup data

## Private Web App

Purpose:

- provide authenticated artist/fan app surfaces in the browser
- validate selected product workflows before or alongside native clients
- expose web-appropriate views for dashboard, culture/world, discovery, chat, settings and labs
- bridge selected shared Rust logic into the browser through WebAssembly

Implementation profile:

- Vite / React / TypeScript
- React Router
- Supabase JavaScript client
- Rust compiled to WebAssembly for selected card/visual and policy logic
- JavaScript/TypeScript tests for safety and onboarding behaviour
- Rust checks and tests for shared WebAssembly policy logic

Public-safe evidence:

- `build:wasm` and `build:policy-wasm` style workflow
- browser WebAssembly bridge for selected shared logic
- separation between React app shell and shared Rust decisions
- safety/onboarding tests at the app-shell level
- culture/visual contract validation

Not public:

- private app source
- generated WASM bundles
- private routes
- proprietary card, reward, policy or safety mechanics
- Supabase project details

## Shared Rust Logic

Purpose:

- keep product decisions consistent across surfaces where duplication would create drift
- support domain, rule and visual-system logic
- provide a bridge into native clients and selected web surfaces
- enable performance-sensitive rendering and interaction experiments

Implementation profile:

- Rust shared crate
- UniFFI-style binding direction for native clients
- WebAssembly builds for selected browser-facing logic
- WGPU/WebGPU-oriented rendering exploration
- shared domain and visual logic where appropriate

Public-safe evidence:

- high-level architecture
- build and binding strategy
- examples of where shared logic is useful
- discussion of why native apps should not re-implement shared rules in isolation

Not public:

- `fan_core` source code
- proprietary shaders
- private assets
- product mechanics
- reward, ranking, entitlement or safety internals

## Native Android

Purpose:

- main native app reference for performance, app interaction and Android-specific behaviour
- practical test target for shared Rust rendering and app-shell integration
- reference surface for later iOS parity work

Implementation profile:

- native Android work alongside earlier Flutter/MVP reference material
- Rust logic integration through native bindings
- device-specific graphics and performance testing
- app flows covering authentication, home/culture views, artist surfaces, chat, card systems and related product areas

Public-safe evidence:

- native-first app strategy
- real-device graphics notes
- cross-device performance tradeoffs
- role of Android as a parity reference for iOS

Not public:

- Android source
- app package builds
- signing material
- private API configuration
- unpublished app screenshots until reviewed

## Native iOS

Purpose:

- port the Android reference into a native SwiftUI iOS app
- preserve visual and behavioural parity where possible
- use shared Rust logic rather than duplicating product rules in Swift

Implementation profile:

- SwiftUI app structure
- Rust bindings generated for iOS use
- Rust library built into an iOS framework
- parity-oriented port plan from Android reference screens
- early foundation work covering auth, design system, Rust binding pipeline and physical-device deploys

Public-safe evidence:

- SwiftUI + Rust binding strategy
- phased port plan
- App Store readiness considerations
- explicit decision to avoid re-implementing shared product logic in Swift-only code

Not public:

- iOS source
- generated private bindings
- Apple team/signing details
- TestFlight/App Store operational material

## Infrastructure and Data Layer

Purpose:

- authentication
- app data
- storage
- public capture flows
- server-side validation and protected operations

Implementation profile:

- Supabase / PostgreSQL
- Cloudflare deployment and worker tooling
- public and authenticated surfaces separated by purpose
- storage/media considerations handled as product architecture, not just hosting

Public-safe evidence:

- the overall backend role in the system
- public/private route separation
- high-level data and auth concerns
- deployment tradeoffs

Not public:

- database schemas
- SQL migrations that reveal private mechanics
- RLS policies
- service-role behaviour
- secrets
- admin operations

## What This Proves

The useful evidence is not that every file can be published. The useful evidence is that the product has been designed and built as a real multi-surface system:

- public web for discovery and conversion
- private app surfaces for deeper workflows
- native clients where app feel matters
- shared Rust logic where consistency matters
- device and browser testing around visual systems
- clear security and confidentiality boundaries
