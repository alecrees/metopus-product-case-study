# Metopus Culture / Scene Explorer

This is a runnable, public-safe engineering demonstration derived from the architecture of Metopus Culture and Scene views. It is intentionally separate from the production application.

The demo focuses on a reviewable front-end and shared-engine boundary:

- React and TypeScript own the interface, filters, selection and accessible controls.
- A small Rust crate calculates Culture and Scene layouts and transition timing.
- `wasm-pack` compiles the crate for browser use through WebAssembly.
- A versioned TypeScript contract validates fictional artist and folder data.
- TypeScript and Rust tests cover contract, view-model, layout and transition behaviour.

## Run locally

Prerequisites:

- Node.js 24 or a compatible current Node.js release
- Rust and Cargo
- the `wasm32-unknown-unknown` Rust target
- `wasm-pack`

```bash
npm install
npm run dev
```

The development script builds the WASM package before starting Vite.

## Checks

```bash
npm run test
npm run build
```

`npm run check` runs both test suites and the production build.

## Structure

```text
fixtures/
  culture.json             fictional versioned contract
src/
  components/              React interaction surfaces
  domain/                  contract validation and view modelling
  engine/                  typed WASM adapter
  hooks/                   responsive layout integration
rust/src/
  layout.rs                simplified Culture and Scene layout engine
  transition.rs            view-transition timing and easing
```

## Public boundary

This repository does not contain the production renderer, shaders, database schema, Supabase policies, private data, ranking or reward mechanics, or exact production Culture Growth and spiral algorithms. The public engine is a deliberately simplified implementation that demonstrates the integration pattern and engineering decisions without exposing commercial source.

No open-source licence is granted. See the repository [notice](../NOTICE.md).
