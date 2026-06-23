# Release Notes - Spark Forge AI v1.0.0

**Release Tag:** `v1.0.0`
**Commit:** `f74c6caee496347d9640c11de8520e0e2e717952`

## Highlights
This release marks the stabilization of the Spark Forge AI platform, resolving critical runtime crashes, addressing strict type safety requirements, and ensuring production readiness.

### Major Changes & Fixes
* **Canvas Runtime Stabilization:** Resolved a severe `Maximum update depth exceeded` crash across WebGL and 3D scenes (FloatingAICore, GlobalCanvas, SpaceTravelCamera, ParticleTrail, HeroSpaceshipScene).
* **Zustand Selector Optimization:** Migrated global state subscriptions from broad object-literal returns to highly targeted primitive/method selectors, eliminating infinite re-render loops.
* **SharedCanvas Fixes:** Fixed prop typings for `dpr` and `gl` to align with `react-three-fiber` expectations.
* **Builder sandboxCode Support:** Enhanced the `Builder` route typing by introducing an `ExtendedBuildBlueprint` type, correctly supporting `sandboxCode`.
* **Supabase Json Typing Fixes:** Enforced correct `Json` payload casting and strict typing in database interactions for jobs, portfolio, and roadmap flows.
* **Major TypeScript Fixes:** Addressed charting tooltip typings, NodeDrawer payload structures, and AI gateway settings (added explicit `messages: []` default).
* **ESLint Cleanup:** Removed problematic `any` usage in `ShowcaseCard` and `roadmap.functions.ts`, replaced unsafe casts with schema-derived types.

### Verification Results
* **Production Build Verification:** ✅ Success
* **Runtime Verification:** ✅ Success (Automated browser sanity checks passing on all major routes `/`, `/builder`, `/portfolio`, `/job-prep`, `/roadmap`).
