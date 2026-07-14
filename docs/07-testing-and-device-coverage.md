# Testing and device coverage

Metopus spans public web, a browser app, native clients, shared Rust, WebAssembly, custom graphics and backend-backed workflows. A single simulator or browser is not enough to validate it.

## Test layers

### Shared core

- Rust build and test checks
- domain and validation tests
- native binding generation and integration
- selected WebAssembly build and contract checks

### Native clients

- Android build and navigation checks
- physical-device deployment
- Android behaviour used as the iOS parity reference
- SwiftUI and Rust-binding integration during the iOS port
- lifecycle, authentication and session restoration checks

### Web

- TypeScript build and lint checks
- public Next.js/Cloudflare preview and deployment
- React app-shell behaviour
- Rust/WebAssembly integration
- responsive layout, keyboard and touch interaction

### Product boundaries

- authentication and onboarding
- age-related routing and capability checks
- permissions and confirmation requirements
- public/private data separation
- failure and fallback behaviour

## Real-device coverage

Testing has covered a mixture of:

- recent and older Android hardware
- recent iOS phone and tablet hardware
- different GPU families and performance levels
- varied screen sizes, refresh rates and touch ergonomics
- constrained devices where graphics cost and memory behaviour become visible

Specific model names are not important to the public case study. The useful evidence is that testing is spread across hardware classes rather than limited to one flagship device.

## Graphics findings

The heaviest card and environmental surfaces expose differences in blending, shader behaviour and frame pacing on older mobile GPUs. The response is a device-aware quality system rather than assuming one render path suits every device.

The design direction includes:

- automatic, high, balanced and older-device profiles
- render scale and frame-rate controls
- focused-card quality prioritisation
- reduced secondary glow and post-processing where required
- lower-cost paths for dense or background surfaces
- graceful browser and WebGPU fallbacks

## Accessibility and responsive checks

Work includes large system-font testing, minimum control sizes, scroll/overflow behaviour, semantic structure, touch ergonomics and layout checks across public web and app surfaces. These checks have already identified and corrected clipping and fixed-height assumptions in native components.

## Excluded material

Raw logs, profiler traces, private builds, exact device inventories, credentials and screenshots containing private data are not published here.
