# Technical Changelog - v1.0.0

This document outlines the file-by-file changes involved in stabilizing the v1.0.0 release.

### `src/components/canvas/GlobalCanvas.tsx`
* **Purpose:** Canvas state provider optimization.
* **Changes:** Substituted `useSceneStore((state) => state)` with granular selectors for specific properties (e.g., `theme`, `transitionMode`).
* **Impact:** Reduced React render cycles significantly, directly resolving infinite loop exceptions during WebGL mount phases.

### `src/components/canvas/FloatingAICore.tsx` & `src/components/canvas/ParticleTrail.tsx`
* **Purpose:** High-performance rendering optimizations.
* **Changes:** Eliminated object-literal returns from Zustand selectors (`useSceneStore(state => ({ x: state.x }))`). Used multiple distinct `useSceneStore(state => state.x)` hooks instead.
* **Impact:** Removed continuous re-renders triggered by strict reference inequality checks on new objects.

### `src/components/canvas/SharedCanvas.tsx`
* **Purpose:** Canvas typing alignment.
* **Changes:** Explicitly cast `dpr` to `[number, number] | number` and `gl` attributes to avoid type conflicts with `react-three-fiber` Prop types.
* **Impact:** Ensured accurate TypeScript checking, preventing potential runtime context creation errors on high DPI displays.

### `src/routes/_app.builder.tsx`
* **Purpose:** Component code-sandbox support safely handled.
* **Changes:** Replaced naive `as any` casts with `ExtendedBuildBlueprint` interfaces that formally type the `sandboxCode` string prop previously omitted by schema generators.
* **Impact:** Prevented runtime null exceptions when rendering user-submitted builder blueprint strings.

### `src/lib/roadmap.functions.ts` & `src/routes/_app.roadmap.tsx`
* **Purpose:** Type-safe database interactions.
* **Changes:** Restructured `.insert` and `.update` payloads ensuring `Json`-typed properties matched the Supabase schema explicitly.
* **Impact:** Resolved potential runtime Supabase insert failures where types didn't map correctly to database table columns.

### `src/lib/ai-gateway.ts`
* **Purpose:** Network failover safety.
* **Changes:** Enforced `messages` payload defaults to prevent passing undefined arrays to standard API endpoints.
* **Impact:** Resolved crashes related to bad request formats from the unified AI interface.
