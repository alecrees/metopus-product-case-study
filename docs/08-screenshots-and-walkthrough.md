# Screenshots and Walkthrough Plan

This document defines the visual material that can be added to the public case study after review.

No screenshot or video should be added unless it passes the asset review checklist.

## Goal

The case study should show enough visual evidence for a recruiter or hiring manager to understand that Metopus is a real product effort, without exposing protected source code, private app data, credentials, admin areas or unreleased commercial mechanics.

Visual assets are currently withheld by design. The next pass is a review and redaction pass, not a rush to publish raw screenshots.

## Recommended Visual Set

### 1. Public Website

Use:

- public homepage screenshots
- public artist/profile style screenshots
- signup or mailing-list public flow screenshots
- responsive desktop/mobile pair after review

Caption focus:

- public positioning
- responsive design
- product onboarding
- public/private boundary
- SEO/shareability

Avoid:

- admin pages
- analytics panels
- environment-specific URLs
- private contact data
- unpublished campaign claims

### 2. Private Web App Shell

Use only if all private data is replaced, hidden or mocked.

Possible views after redaction:

- app shell/navigation
- culture/world visual surface
- lab/demo card or visual surface
- settings/onboarding state where no private data appears

Caption focus:

- React app shell
- Rust/WebAssembly integration
- visual-system testing
- safety/onboarding checks

Avoid:

- real user accounts
- private artist/fan data
- admin controls
- database IDs
- hidden product mechanics

### 3. Native Android

Use:

- public-safe app screenshots
- device comparison screenshots if no private data appears
- visual-surface screenshots

Caption focus:

- native performance
- real-device validation
- graphics profile considerations
- Android as iOS parity reference

Avoid:

- APK names/build paths
- debug overlays with sensitive paths
- private user or artist data
- unreleased commercial mechanics

### 4. Native iOS

Use:

- foundation/parity screenshots after privacy review
- app shell screenshots
- Rust binding or card-gallery evidence only if visually safe

Caption focus:

- SwiftUI native client
- Rust shared-logic binding
- parity from Android reference
- App Store readiness thinking

Avoid:

- Apple team/signing material
- private TestFlight data
- real account details

### 5. Architecture Diagram

Use:

- a clean static export of the public-safe architecture diagram
- optionally a "surface map" diagram showing public web, private web, Android, iOS, Rust/WASM and Supabase

Caption focus:

- multi-surface architecture
- clear confidentiality boundaries
- why source remains private

## Asset Review Checklist

Before adding an image or video:

- No private email address is visible.
- No API key, token, environment variable, QR secret, table name or diagnostic path is visible.
- No Supabase project ID or internal admin route is visible.
- No private fan, artist, bandmate or customer data is visible.
- No unfinished pricing or monetisation logic is shown.
- No protected product mechanics are shown in enough detail to copy.
- No DCE or third-party asset is used unless usage is approved.
- The screenshot still makes sense with a caption.
- The filename is generic and public-safe.

## Suggested File Naming

Use simple names:

- `public-homepage-desktop.png`
- `public-homepage-mobile.png`
- `artist-profile-public.png`
- `web-app-shell-redacted.png`
- `wasm-visual-surface.png`
- `android-device-test-redacted.png`
- `ios-shell-redacted.png`

Avoid filenames containing:

- account names
- emails
- database IDs
- internal route names
- secrets
- "admin"
- "private"

## Screenshot Intake Workflow

1. Collect 10-15 candidate screenshots locally.
2. Review them visually.
3. Keep only 4-6 strong images.
4. Redact/crop where needed.
5. Compress for GitHub.
6. Add captions in this document.
7. Link the strongest two from the main README.

The goal is not quantity. The goal is credible visual proof without creating IP or privacy risk.
