# Recording Script And Shot List

This is the practical recording version of the Metopus product walkthrough. It is separate from the Metopus marketing/founder script.

Audience: recruiters, hiring managers, interviewers and portfolio reviewers.

Target length: 2-3 minutes.

Format: record a calm face-to-camera introduction, then overlay public-safe app screenshots, emulator captures, diagrams and short clips.

## Recording Goal

The video should make one thing clear:

Metopus is a real multi-surface product effort, but the source and sensitive implementation details are private because the product is commercially active.

Do not try to sell every Metopus feature. The video is evidence of product ownership, architecture, implementation judgement, testing and communication.

## Main Script

Hi, I am Alec Rees, and this is a short walkthrough of Metopus, my main current product project.

Metopus is an early-stage platform for artists and fan communities. The idea is direct artist and fan connection: public artist discovery, fan capture, deeper app-based experiences, artist tools, community surfaces and shared product logic across platforms.

The production repositories are private because this is an active commercial product. They contain protected product logic, backend and security-sensitive work, generated bindings, app code and assets that should not be public. So this walkthrough focuses on the public-safe parts of the work: what the product is, how it is structured, what I worked on, and what the implementation proves.

At a high level, Metopus is split into a few connected surfaces.

There is a public web layer for marketing, artist profiles, search-friendly pages and fan capture. Those pages need to be fast, readable, shareable and safe for people who do not already have the app.

There is also authenticated app work for deeper artist and fan workflows. That includes browser-based app surfaces, native Android work, native iOS work, and shared Rust logic where consistency or performance matters.

One of the important architecture decisions is that not every surface should do the same job. Public web is best for discovery and entry points. Native apps are better for polished interaction, device behaviour, notifications and performance-sensitive visual systems. Shared Rust and WebAssembly help reduce drift where selected product rules or visual behaviour need to stay consistent.

My role has been founder and product developer. I have worked across product framing, system planning, interface direction, web and mobile implementation support, Rust and WebAssembly direction, Supabase-backed workflow planning, testing, documentation and AI-assisted development workflow.

I am not presenting this as a claim that I am a senior specialist in every technology involved. The useful evidence is broader: taking a large ambiguous product idea, structuring it into real workflows, making sensible architecture decisions, testing across device classes, and communicating the work clearly without exposing private implementation.

Testing matters because this is not just a static website. Metopus includes app navigation, onboarding, safety-related routing, browser behaviour, native app behaviour and performance-sensitive visual surfaces. I have tested across different classes of Android and iOS hardware, including newer and older devices, because graphics and app behaviour can fail very differently on real hardware than they do in one emulator.

AI-assisted development has also been part of the process. I use AI tools for planning, implementation support, debugging, refactoring and documentation, but I remain responsible for product direction, review, integration and final quality.

The reason this is presented as a case study rather than a public source repository is simple: the product is active and commercially sensitive. But the public-safe evidence still shows the shape of the work: product thinking, cross-platform architecture, implementation judgement, testing approach and technical communication.

## Shorter Version

Hi, I am Alec Rees. This is a short walkthrough of Metopus, my main current product project.

Metopus is an early-stage platform for artists and fan communities, built around direct artist and fan connection. It spans public web, authenticated app surfaces, native Android and iOS work, shared Rust logic, WebAssembly and Supabase-backed infrastructure.

The source code is private because the product is commercially active and contains protected implementation, backend work, generated bindings and private assets. So this walkthrough shows the public-safe evidence: the product structure, architecture decisions, testing approach and my role in shaping the work.

My role has been founder and product developer. The useful evidence here is not a public code dump. It is product ownership, system thinking, implementation judgement, cross-platform planning, practical testing and the ability to explain complex work responsibly.

## Shot List

Use this as a simple edit plan.

| Time | Visual | Spoken Focus |
| --- | --- | --- |
| 0:00-0:10 | Face to camera or title card | "This is Metopus, my main current product project." |
| 0:10-0:25 | Public website homepage | What Metopus is and who it is for. |
| 0:25-0:40 | Public artist/profile or fan-capture screen | Public web, discovery and entry points. |
| 0:40-0:55 | Architecture diagram | Web, app surfaces, native clients, Rust/WASM, backend. |
| 0:55-1:15 | Emulator/mobile app shell screenshot | Authenticated app surfaces and deeper workflows. |
| 1:15-1:35 | Visual/culture/card surface | Why native and visual systems matter. |
| 1:35-1:50 | Web app or WASM-related visual, if safe | Shared Rust/WebAssembly and consistency. |
| 1:50-2:10 | Testing/device-coverage slide | Testing across device classes and real hardware behaviour. |
| 2:10-2:30 | Case-study docs / public-safe boundary slide | Why source is private and what evidence can be reviewed. |
| 2:30-2:45 | Face to camera or closing title | Product ownership, technical communication and interview discussion. |

## Screenshot Priority

Take working app/product screenshots first, not code.

Best first screenshots:

1. Public homepage, desktop.
2. Public homepage, mobile.
3. Public artist/profile page with safe demo/public data.
4. Mailing-list or QR/fan capture flow with no private emails visible.
5. Web app shell/navigation using a demo account.
6. Culture/world/visual surface with no private user data.
7. Card or visual renderer screen, if it does not reveal protected mechanics.
8. Native Android app home or visual surface, cropped cleanly.
9. Native iOS shell/parity screen, if clean enough.
10. Public-safe architecture diagram from the case-study repo.

Avoid code screenshots unless there is a specific interview reason to show code privately.

## Emulator Overlay Guidance

Using emulator screenshots inside a mobile-device frame is a good idea.

Keep it clean:

- crop out Android Studio, debug logs and desktop clutter
- hide emulator toolbar controls if possible
- use a consistent device-frame mockup
- avoid visible account emails, IDs, URLs, debug overlays or notification bars
- use demo data, abstract visuals or redacted content
- keep each screenshot on screen long enough to understand

Do not overdo the device frame. It should help the viewer read "mobile app", not make the video look like a phone advert.

## Recording Notes

Tone:

- calm
- plain-spoken
- practical
- not over-salesy
- confident without overclaiming

Avoid:

- listing every feature
- saying the source is private defensively
- overpromising release status
- showing code, schemas, dashboards, admin tools or private data
- making strong market claims that need external proof

Good framing:

> "The product is active and commercially sensitive, so the public evidence is a case study rather than a source dump."

> "The useful evidence is product ownership, architecture, testing and communication."

## Optional Closing Line

The source is private, but I am happy to discuss the architecture, implementation decisions and selected technical details in interview where appropriate.
