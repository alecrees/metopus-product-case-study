# Public-Safe Diagrams

These diagrams are intended for portfolio review. They explain system shape and ownership boundaries without exposing private source code, schemas, security rules, credentials, proprietary mechanics or unpublished commercial details.

## Product Surface Map

```mermaid
flowchart LR
    Visitor["Visitor / fan / artist"] --> PublicWeb["Public web<br/>marketing, profiles, fan capture"]
    PublicWeb --> AppHandoff["App or signup handoff"]
    AppHandoff --> WebApp["Authenticated web app<br/>browser workflows"]
    AppHandoff --> NativeApps["Native apps<br/>Android and iOS"]
    WebApp --> SharedLogic["Shared Rust / WASM logic"]
    NativeApps --> SharedLogic
    SharedLogic --> Backend["Supabase / PostgreSQL<br/>auth, data, storage"]
    PublicWeb --> Cloudflare["Cloudflare deployment<br/>public web and edge tooling"]
```

What this shows:

- public discovery and authenticated app work are separate concerns
- native apps exist where performance and device integration matter
- Rust/WebAssembly is used where consistency or rendering behaviour benefits from shared logic
- backend and infrastructure details are deliberately abstracted

## Public And Private Boundary

```mermaid
flowchart TB
    subgraph PublicEvidence["Safe public evidence"]
        Overview["Product overview"]
        Diagrams["Architecture diagrams"]
        Testing["Testing approach"]
        Workflow["AI-assisted workflow"]
        Screenshots["Reviewed screenshots"]
    end

    subgraph PrivateImplementation["Private implementation"]
        Source["Production source"]
        Schemas["Database schemas and policies"]
        Secrets["Keys, tokens and environment config"]
        Mechanics["Protected product mechanics"]
        Assets["Unreleased assets and builds"]
    end

    PublicEvidence -. "summarises without exposing" .-> PrivateImplementation
```

What this shows:

- the public case study is a summary layer, not a substitute repository
- the useful proof is architecture, judgement, process and selected reviewed visuals
- private implementation remains protected

## Shared Logic Direction

```mermaid
flowchart LR
    RustCore["Shared Rust logic"] --> Android["Android client"]
    RustCore --> IOS["iOS client via bindings"]
    RustCore --> WASM["Browser WASM modules"]
    WASM --> ReactApp["React / TypeScript app shell"]
    Android --> DeviceTesting["Native device testing"]
    IOS --> DeviceTesting
    ReactApp --> BrowserTesting["Browser and app-shell testing"]
```

What this shows:

- shared logic reduces behavioural drift between app surfaces
- browser-facing Rust can be compiled through WebAssembly where appropriate
- native and web surfaces still need their own testing layers

## Evidence Map

```mermaid
flowchart TD
    Product["Product ownership"] --> Architecture["Architecture documents"]
    Product --> Copy["Public product explanation"]
    Product --> Boundaries["Confidentiality rules"]

    Implementation["Implementation judgement"] --> Web["Public web / app-shell strategy"]
    Implementation --> Rust["Rust / WASM direction"]
    Implementation --> Native["Native Android / iOS direction"]

    Quality["Quality and testing"] --> Devices["Real hardware classes"]
    Quality --> Safety["Safety and onboarding checks"]
    Quality --> Visuals["Visual and graphics behaviour"]

    Communication["Technical communication"] --> Summary["Executive summary"]
    Communication --> Walkthrough["Public walkthrough script"]
    Communication --> Interview["Interview discussion points"]
```

What this shows:

- the case study is aimed at human review, not just repository browsing
- it connects product, implementation, quality and communication into one coherent evidence layer
