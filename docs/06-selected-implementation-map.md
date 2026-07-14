# Selected implementation map

This map distinguishes working evidence from active ports and product R&D. It is not an exhaustive feature list.

## Native Android

**Stack:** Kotlin, Jetpack Compose, native navigation, Rust bindings and custom graphics surfaces.

**Evidence:** authentication and onboarding work, artist/fan navigation, product screens, shared-core integration, accessibility fixes, real-device graphics profiling and safety hardening.

**Status:** working implementation and current native reference.

## Native iOS

**Stack:** SwiftUI, generated Rust bindings, native authentication and keychain/session work, Xcode project and physical-device pipeline.

**Evidence:** foundation and Community Join parity, design-system components, Rust framework generation and documented screen-by-screen port specifications.

**Status:** native parity port in progress. The complete Android surface has not yet been ported.

## Shared Rust core

**Responsibilities:** domain models, validation, state, capability decisions, native bindings, selected browser/WASM logic and graphics systems.

**Evidence:** a multi-module core, hundreds of tests recorded during its expansion, generated native interfaces and WGPU/WGSL rendering work.

**Status:** working implementation under continued refactoring and hardening.

## Public web

**Stack:** Next.js, React, TypeScript, Cloudflare/OpenNext deployment and public capture infrastructure.

**Evidence:** live product pages, public artist/profile planning, SEO and social-sharing work, responsive layouts and campaign entry points.

**Status:** live and continuing to develop.

## Browser app

**Stack:** React, TypeScript, Vite, Supabase client and selected Rust/WebAssembly modules.

**Evidence:** authenticated app foundation, browser policy/WASM work and product-surface experiments.

**Status:** in development; not represented as feature-complete.

## Backend and infrastructure

**Stack:** Supabase/PostgreSQL, storage and edge functions, with Cloudflare deployment and media infrastructure.

**Evidence:** authentication, public capture, data-backed product flows, age/safety work, media planning and cost-aware scaling decisions.

**Status:** active working infrastructure with continued security and product hardening.

## AI product architecture

**Design:** a user-facing coordinator delegates to focused specialist roles. Product actions use typed inputs, permission checks, confirmation requirements and audit metadata.

**Evidence:** detailed specifications, a pre-launch settings surface, Backstage Memory architecture and sandboxed behaviour/personality tests.

**Status:** pre-launch R&D. The AI agents are not described as production-shipped.
