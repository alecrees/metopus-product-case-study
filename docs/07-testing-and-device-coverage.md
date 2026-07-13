# Testing and Device Coverage

This document summarises the public-safe testing approach used around Metopus. It does not include private logs, credentials, unpublished app builds or sensitive implementation details.

## Testing Priorities

Metopus has several different failure modes because it spans public web, private web, native apps, shared Rust logic, WebAssembly, graphics rendering and backend-backed product flows.

Testing therefore focuses on:

- app launch and navigation
- auth and onboarding behaviour
- age/safety-related routing and capability checks
- public web rendering and deployment
- WebAssembly build and integration checks
- Rust shared-logic checks
- visual surface correctness
- real-device graphics performance
- browser compatibility and graceful fallback
- responsive layout and touch interaction

## Web App Checks

The private web app uses separate checks for TypeScript, Rust/WebAssembly and selected product behaviours.

Public-safe examples:

- TypeScript build through the app build pipeline
- linting
- Rust `cargo check` for browser-targeted crates
- Rust tests for safety/policy logic
- Node-based tests for safety state and onboarding behaviour
- culture/visual contract validation against the generated WebAssembly module

This matters because the app shell is not only React UI. Some browser-facing behaviour comes through Rust compiled to WebAssembly, so the test surface has to cover both JavaScript/TypeScript and Rust.

## Public Web Checks

The public web surface has a separate deployment and preview concern because it is SEO/public-route oriented.

Public-safe examples:

- Next.js build and lint
- Cloudflare/OpenNext preview and deploy workflow
- separate worker deployment for mailing-list style capture surfaces
- public sharing/preview asset generation where appropriate
- responsive checks for marketing and public artist routes

## Native and Rust Checks

Native surfaces use shared Rust logic where possible. The main testing question is not just "does the app compile?" but "does the behaviour stay consistent across app surfaces?"

Public-safe examples:

- Rust library build and binding pipeline
- Android reference behaviour used as a parity source for iOS
- iOS binding strategy using Rust-generated interfaces
- native-device deployment checks
- checks that safety or product-rule decisions are not implemented only in a single UI layer

## Real-Device Graphics Notes

Metopus includes performance-sensitive visual and card surfaces. These need real-device checks because graphics behaviour differs across devices, GPUs and OS versions.

Observed public-safe test coverage includes:

- recent flagship Android hardware
- mid-range Android hardware
- older Android hardware with more constrained GPU performance
- iOS phone and tablet hardware
- different GPU families and display characteristics
- different screen sizes, refresh rates and touch ergonomics

Public-safe observations from device testing:

- the app installed and rendered correctly across older and newer hardware classes
- culture view was comparatively smooth on older hardware
- heavier artist-card and scene surfaces showed more slowdown/jank on older hardware
- older mobile GPUs can show different colour, blending and shader behaviour, flagged for future visual tuning
- the practical response is graceful graphics-profile scaling rather than replacing the whole renderer

## Graphics Profile Direction

The testing notes support a device-aware graphics profile system:

- Auto
- High
- Balanced
- Battery / Older Device

Possible quality controls:

- FPS cap
- internal render scale
- focused-card priority over side-card quality
- reduced glow/pass intensity on older devices
- softened or disabled gyro/parallax on older devices
- lower-cost mini-card paths for chat or dense surfaces

This is a product-quality decision as much as a technical one: older devices should feel intentionally tuned, not broken.

## What Is Not Published

The public case study does not publish:

- raw logs
- profiler traces
- app builds
- screenshots with private data
- exact device inventory or identifiers
- private bug notes that reveal sensitive mechanics
- security policy details

## Interview Discussion

In an interview, this testing story can support discussion around:

- why product surfaces need different test strategies
- how shared Rust/WebAssembly changes the test matrix
- how to reason about graphics quality across real devices
- how to keep safety and access-control decisions out of UI-only code
- how to balance polish, performance and commercial confidentiality
