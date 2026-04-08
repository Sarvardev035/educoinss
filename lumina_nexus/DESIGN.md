# Design System Specification: The Kinetic Luminescence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Observatory."** 

We are moving away from the "flat dashboard" trope and toward an immersive, cosmic environment that feels both high-tech and academically prestigious. The system breaks the traditional grid through **Intentional Asymmetry** and **Tonal Depth**. By utilizing overlapping surfaces and a high-contrast typography scale (pairing the technical precision of Inter with the architectural character of Space Grotesk), we create a signature editorial look. The interface should feel like a high-end physical console—tactile, deep, and glowing with data.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Space" foundation, using vibrant primary tones to differentiate user roles while maintaining a cohesive, premium atmosphere.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts or subtle tonal transitions. Use `surface-container-low` against a `surface` background to create a "well" or "plateau" effect.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create "nested" depth:
- **Level 0 (Base):** `surface` (#0e0e12) – The infinite background.
- **Level 1 (Sections):** `surface-container-low` (#131317) – Used for sidebar backgrounds or large content areas.
- **Level 2 (Cards):** `surface-container` (#19191e) – The primary unit for content containers.
- **Level 3 (Prominence):** `surface-container-high` (#1f1f24) – For active cards or modals.

### The Glass & Gradient Rule
To achieve a "signature" feel, floating elements (modals, tooltips, or top navigation) should utilize **Glassmorphism**. 
- **Recipe:** Semi-transparent `surface-container` (60-80% opacity) + `backdrop-blur` (16px to 32px).
- **Signature Textures:** Use subtle linear gradients for main CTAs (e.g., `primary` to `primary-container`). This adds "soul" and prevents the UI from feeling like a generic template.

---

## 3. Typography
We use a dual-font strategy to balance high-tech gamification with academic authority.

*   **Display & Headlines (Space Grotesk):** Used for large numbers, achievements, and section headers. Its geometric quirks provide the "high-tech" personality.
*   **Body & Labels (Inter):** Used for all functional data, descriptions, and UI controls. Inter provides the "dashboard" feel and maximum legibility at small sizes.

### Scaling & Identity
- **Display-LG (3.5rem):** Reserved for big "EduCoin" balances or level-up moments.
- **Headline-MD (1.75rem):** Used for primary module titles.
- **Title-SM (1rem):** The workhorse for card titles and navigation labels.
- **Label-SM (0.6875rem):** Used for metadata, uppercase with 0.05em tracking for a technical, "HUD" aesthetic.

---

## 4. Elevation & Depth
In this system, depth is a matter of light and density, not lines.

### The Layering Principle
Stacking tiers is the primary method of organization. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural "recessed" look without shadows.

### Ambient Shadows
When an element must float (e.g., a coin pop-up), use **Extra-Diffused Ambient Shadows**:
- **Blur:** 40px - 60px.
- **Opacity:** 4% - 8%.
- **Color:** Use a tinted version of the `primary` or `secondary` color rather than black to simulate a glowing light source.

### The "Ghost Border" Fallback
If a container requires a border for accessibility, it must be a **Ghost Border**: 
- Use the `outline-variant` token.
- Reduce opacity to **15%**.
- **Never** use 100% opaque, high-contrast lines.

---

## 5. Components

### Buttons
- **Primary (Student):** Gradient from `primary` to `primary-dim`. Roundedness: `md`.
- **Secondary (Parent):** Solid `secondary_container` with `on_secondary_container` text.
- **Tertiary/Ghost:** No container. Use `primary` text and a subtle `surface_bright` hover state.
- **States:** On hover, primary buttons should emit a soft glow (`surface_tint` at 20% opacity shadow).

### Cards & Lists
- **Rule:** Forbid divider lines. 
- Use vertical white space (1.5rem to 2rem) or `surface-container` shifts to separate items.
- Cards should use `rounded-lg` (1rem) for a friendly yet sleek feel.

### Input Fields
- **Background:** `surface_container_highest`.
- **Active State:** A 1px "Ghost Border" of `primary` and a subtle inner glow.
- **Typography:** `body-md`.

### Specialized Components
- **The Achievement Orb:** A circular container for `tertiary` (Gold) coins, utilizing a radial gradient and high-blur shadow to simulate a physical coin.
- **Progress Trackers:** High-contrast bars using `primary` (Purple) on top of `surface_container_highest`, with a "glow-cap" at the lead of the progress bar.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional asymmetry. For example, align text to the left but place a large, cropped achievement icon overlapping the right edge of a card.
- **Do** use `surface-bright` for hover states on dark backgrounds to create a "lighting up" effect.
- **Do** treat "Parent" and "Student" views as distinct color worlds. Purple defines the student’s journey; Teal defines the parent’s oversight.

### Don't
- **Don't** use 1px solid white or grey lines. They break the immersive "dark-mode" depth.
- **Don't** use standard drop shadows. If it doesn't look like an ambient glow, it's too heavy.
- **Don't** overcrowd the dashboard. High-end editorial design requires significant negative space (use `xl` spacing tokens frequently).
- **Don't** use "pure black" (#000) except for the absolute `surface_container_lowest` layer to ensure the screen doesn't feel "dead."