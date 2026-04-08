# Design System Document: The Luminous Layer

## 1. Overview & Creative North Star

### Creative North Star: "The Ethereal Core"
This design system rejects the "flat and boxy" status quo. Instead, it treats the interface as a centralized, high-contrast focal point emerging from a deep, atmospheric void. The design philosophy centers on **The Ethereal Core**: a sophisticated interplay between a dark, vibrant ambient background and a pristine, layered white canvas. 

We move beyond standard templates by emphasizing **Intentional Isolation**. By centering core workflows on floating "Editorial Cards" (Surface-Container-Lowest) against a rich, blurred backdrop, we create a premium experience that feels both grounded and weightless. We lean into Plus Jakarta Sans’ modern curves and a generous "Rounding Scale" to ensure every touchpoint feels approachable yet high-end.

---

## 2. Colors

### Palette Strategy
The palette is built on high-contrast tension: the deep saturation of the "Void" (Background #1A1A2E) against the purity of the "Core" (Surface #FCF8FF).

*   **Primary (#0058BE):** Used for critical actions. In this system, it is often softened into a gradient (from `primary` to `primary_container`) to add soul and depth to CTAs.
*   **Secondary (#6B38D4):** Represents the vibrant brand accent, mirroring the purples found in the ambient background.
*   **Tonal Layering (The Surface Tier):**
    *   `surface_container_lowest (#FFFFFF)`: Used for the most prominent, elevated cards.
    *   `surface_container_low (#F5F2FF)`: Used for nested inputs or secondary sections within the main card.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or layout containment. Boundaries must be defined through background shifts. For example, an input field (`surface_container_low`) should sit inside a main card (`surface_container_lowest`) to create a boundary purely through a shift in tone.

### The "Glass & Gradient" Rule
To elevate the experience, floating navigation or secondary utility panels should utilize **Glassmorphism**. Use `surface` at 60% opacity with a `backdrop-filter: blur(24px)`. This integrates the UI into the vibrant purple/blue background rather than severing it.

---

## 3. Typography

### The Editorial Scale
We use **Plus Jakarta Sans** exclusively. Its geometric yet warm personality is the backbone of the system's "minimalist-premium" feel.

*   **Display-LG (3.5rem):** Reserved for high-impact hero moments. Low letter-spacing (-0.02em).
*   **Headline-SM (1.5rem):** Used for card titles. Bold weight. This provides the authoritative "Editorial" anchor for every page.
*   **Body-MD (0.875rem):** The workhorse. Increased line-height (1.6) to ensure the minimalist layout feels breathable.
*   **Label-MD (0.75rem):** Used for input labels, set in Semi-Bold with `on_surface_variant` to ensure hierarchy without competing with user data.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Stacking**. For instance, a "Create Account" card uses `surface_container_lowest`. Inside it, input fields use `surface_container_low`. This creates a tactile "recessed" look without the clutter of lines.

### Ambient Shadows
Traditional drop shadows are forbidden. Instead, use **Ambient Diffusion**:
*   **Blur:** 40px to 80px.
*   **Opacity:** 4% - 6%.
*   **Color:** Tint the shadow with the `on_surface` color (`#1A1A2E`) to ensure the shadow feels like a natural lighting byproduct of the environment.

### The "Ghost Border" Fallback
If an element lacks sufficient contrast (e.g., a white button on a light surface), use a **Ghost Border**. Apply `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Uses a soft gradient from `primary` to `primary_container`. Corner radius: `md` (0.75rem). Text is `on_primary` (White).
*   **Secondary/Social:** `surface_container_lowest` with an Ambient Shadow. Used for third-party auth (Google/Apple) to maintain a clean, white-label look.

### Input Fields
*   **Visual Style:** No border. Background set to `surface_container_low`. 
*   **Rounding:** `md` (0.75rem) to match buttons.
*   **States:** On focus, the background transitions to a subtle `primary_fixed` tint with a "Ghost Border."

### Cards
*   **Style:** `surface_container_lowest`. 
*   **Rounding:** `xl` (1.5rem). 
*   **Rule:** Forbid divider lines within cards. Use 32px or 48px of vertical white space to separate the header, body, and footer actions.

### Chips
*   **Action Chips:** Used for small interactive tags. Use `secondary_fixed` with `on_secondary_fixed_variant` text for high-contrast legibility.

---

## 6. Do's and Don'ts

### Do
*   **DO** use generous whitespace. If a layout feels "tight," double the padding.
*   **DO** use the `primary_fixed` color for subtle background highlights behind icons or text to guide the eye.
*   **DO** ensure the background gradient (Purple/Blue) remains vibrant; it provides the "soul" that makes the white cards pop.

### Don't
*   **DON'T** use 100% black (#000000) for text. Always use `on_surface` (#1A1A2E) to maintain the sophisticated tonal palette.
*   **DON'T** use "hard" shadows. If you can see where the shadow starts, it is too dark.
*   **DON'T** use standard 4px or 8px rounding. This system requires the "Soft-Modern" look of `0.75rem` (md) and `1.5rem` (xl).