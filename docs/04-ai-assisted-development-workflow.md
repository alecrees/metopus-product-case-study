# AI-Assisted Development Workflow

AI-assisted development is part of the Metopus workflow. It is used as an acceleration and collaboration layer, not as a replacement for product ownership or review.

## How AI Is Used

AI tools are used for:

- breaking large product goals into implementation plans
- comparing technical approaches
- scaffolding code for review
- debugging errors and regressions
- writing tests and test plans
- refactoring and documentation support
- summarising handoffs between work sessions
- checking edge cases and alternative designs

## Human Responsibility

The responsibilities that remain human-owned include:

- product direction
- user and artist needs
- architecture decisions
- privacy and commercial boundaries
- implementation review
- integration with existing code
- test selection and device validation
- final quality judgement

## Practical Workflow

The normal pattern is:

1. Define the user problem or product goal.
2. Turn the goal into a constrained technical plan.
3. Use AI tools to accelerate implementation or analysis.
4. Review the output against the existing architecture.
5. Run tests, inspect behaviour and check device/browser results.
6. Iterate until the feature or fix is coherent.
7. Document the decision if it affects future work.

## Why This Matters

Metopus is broad: public website, private app, native Android, native iOS, shared Rust logic, database-backed workflows, visual systems and product strategy.

AI assistance helps move across that breadth, but the value is not blind code generation. The value is being able to ask better questions, inspect outputs critically, integrate changes into a wider system and keep product decisions grounded.

## Accurate Public Wording

Recommended wording:

> I use AI-assisted development tools to accelerate prototyping, implementation, testing and debugging. I review and test outputs, integrate them into the wider architecture, and remain responsible for product direction, technical decisions and final quality.

Avoid wording that implies:

- the product was built without AI support
- AI made the product independently
- senior specialist expertise in every language or platform used
- confidential source code can be made public
