# Public Walkthrough Script

This script is for a short portfolio or interview walkthrough. It is not the Metopus marketing video script. It borrows the same visual-capture discipline from the marketing planning work, but the audience is a recruiter, hiring manager or interviewer.

Target length: 2-3 minutes.

## Purpose

The walkthrough should answer four questions quickly:

- What is Metopus?
- What did I build or direct?
- Why is the source private?
- What does the work prove?

## Script

Metopus is my main current product project. It is an early-stage platform for artists and fan communities, built around direct artist/fan connection rather than relying entirely on third-party social feeds.

The source code is private because this is an active commercial product. It includes protected product logic, backend security work, unreleased app code, generated bindings, assets and implementation details that should not be published. So instead of showing a source dump, this case study shows the public-safe architecture and the decisions behind the work.

At a high level, Metopus has several connected surfaces. There is a public web layer for marketing, artist profiles, discovery and fan capture. There are authenticated app surfaces for deeper artist and fan workflows. There is native mobile work across Android and iOS, and shared Rust logic where consistency or visual performance matters. Some browser-facing logic is compiled to WebAssembly so the web app can use selected shared behaviour rather than re-implementing everything in TypeScript.

My role has been founder and product developer. I have worked across product framing, architecture, interface direction, web and mobile planning, Rust/shared-logic direction, Supabase-backed workflow planning, testing, documentation and AI-assisted development workflow. I am not presenting this as a claim of senior specialist expertise in every language involved. The evidence is broader: product ownership, system thinking, implementation judgement, quality control and the ability to communicate a complex product clearly.

One important part of the work is deciding what belongs where. Public artist profiles need to be fast, readable and shareable. Native apps are better for performance-sensitive interaction, device behaviour, notifications and polished app feel. Shared Rust logic helps avoid drift when product rules or visual systems need to stay consistent across multiple surfaces.

Testing also has to match that shape. The product is checked across browser and native surfaces, with attention to onboarding, safety-related routing, visual behaviour, graphics performance and real hardware classes. The goal is not just that something works on my main machine, but that older and newer devices fail gracefully and that visual quality can be tuned instead of breaking the experience.

AI tools have been part of the development process, but as an acceleration and review workflow, not as a replacement for ownership. I use them for planning, implementation support, debugging, refactoring and documentation. I still make the product decisions, review the output, integrate it with the wider system and test the result.

The next public layer for this case study is visual proof: a small number of reviewed screenshots, public-safe diagrams and possibly clean capture clips. Those will be redacted and checked so they show the product without exposing private data, protected mechanics or unfinished commercial work.

## Visual Beat Sheet

Use this order when screenshots or clips are available:

1. Public website or artist profile surface.
2. Public-safe architecture diagram.
3. Redacted web app or visual-system surface.
4. Native app visual proof, if safe.
5. Testing/device coverage summary.
6. Confidentiality boundary note.

## Capture Rules

Use controlled captures, not rough handheld recordings.

Screenshots or clips should have:

- no system notification bars unless intentionally shown
- no private accounts, emails or real user data
- no admin panels or internal routes
- no visible environment values, IDs, tokens or diagnostics
- no protected band or third-party assets without approval
- no product mechanics shown in enough detail to copy
- clear captions that explain what the viewer is seeing

The strongest visual proof should be clean and simple: public web surfaces, redacted app surfaces, abstract visual systems, architecture diagrams and carefully reviewed motion assets.

## Shorter Version

Metopus is my main product project: a commercially sensitive artist and fan platform spanning public web, authenticated app surfaces, native Android and iOS, shared Rust logic, WebAssembly and Supabase-backed infrastructure. The source is private because the product contains protected implementation and security-sensitive work, so this case study documents the public-safe architecture, testing approach, AI-assisted workflow and product decisions. The value here is product ownership, cross-platform systems thinking, implementation judgement and the ability to communicate complex technical work responsibly.
