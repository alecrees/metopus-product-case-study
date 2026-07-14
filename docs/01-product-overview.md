# Product scope and status

Metopus is an artist and fan platform developed through Metopida Ltd. The concept began around three years ago and is informed by roughly twenty years of direct experience as a working musician, teacher, producer and small music-business owner.

## Product direction

The original problem was audience ownership. Artists can build large followings on social platforms without owning the relationship or knowing whether future posts will reach those people. Metopus adds a public, indexable artist presence and direct fan capture, then connects that entry point to richer app-based community and artist tools.

It has since developed into a broader product covering:

- public artist identity and discovery
- direct fan capture and communication
- artist and fan communities
- artist cards and collection mechanics
- Backstage chat and working rooms
- demo review and release workflows
- calendar, rehearsal and event planning
- music, ticketing and artist commerce foundations
- Volt participation and progression
- professional profiles and practical artist tools

Not every planned surface is production-complete. The sections below separate demonstrated work from active development and longer-term R&D.

## Demonstrated product work

- Flutter MVP used as the first broad product and interaction reference.
- Native Android client in Kotlin and Jetpack Compose.
- Shared Rust core with domain, validation, state and graphics responsibilities.
- Original WGPU/WGSL graphics and motion systems.
- Live public Next.js/React product website.
- React/TypeScript browser app foundation with selected Rust/WebAssembly integration.
- Supabase/PostgreSQL authentication, data and storage work.
- Artist World, artist cards, Backstage audio review, calendar, AI-control prototype and Volt-ledger surfaces shown in this repository.
- Real-device graphics, layout and accessibility testing across varied hardware classes.

## Active development

- Native Android feature integration and safety hardening.
- SwiftUI iOS parity port using Android as the behavioural reference.
- Rust-to-iOS binding and Metal/WGPU surface work.
- Browser app foundations and shared policy/WASM integration.
- Age gating, moderation and server-backed capability enforcement.
- Media, storage and operational cost controls.

## AI product R&D

The planned AI layer is organised around a user-facing artist coordinator and four specialist roles covering booking/opportunities, events/ticketing, promotion and logistics. It is designed around structured product actions rather than free access to the database.

The work includes:

- Backstage Memory for room-scoped artist context
- typed actions and permission checks
- confirmation and audit requirements
- specialist delegation behind one user-facing assistant
- sandbox testing before main-product integration

This is pre-launch work. The settings surface is implemented as a product/UI prototype, while agent behaviour and architecture are being tested outside the production app.

## Longer-term research

These are distinct plans and should not be treated as one feature:

- **Sourcing and procurement:** user-requested recommendations, local sourcing and approval-led purchase preparation.
- **Road Grade:** contextual trust signals based on verified real-world professional use, kept independent from retailer influence.
- **Opportunity discovery:** tools and data pipelines for relevant gigs, venues and professional work.

## Product principle

The repository should show the scope of the thinking without presenting the roadmap as shipped software. Current, in-progress and planned work remain labelled throughout.
