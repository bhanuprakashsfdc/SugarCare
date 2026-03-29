# Design System Strategy: The Digital Sanctuary

## 1. Overview & Creative North Star
The North Star for this design system is **"The Digital Sanctuary."** 

In the high-stakes environment of blood sugar management, the interface must act as a calming agent, not a source of cognitive load. We move beyond "medical-grade" utility into "editorial-grade" care. This is achieved through **Organic Asymmetry** and **Tonal Depth**. By avoiding the rigid, boxed-in grids of traditional health apps, we create an interface that feels breathable, fluid, and premium. 

We prioritize white space as a functional component, using it to guide the eye toward critical health data. The layout should feel like a high-end wellness magazine—authoritative yet deeply inviting.

---

## 2. Colors & Surface Architecture
Our palette uses a sophisticated Material Design logic to ensure "The Digital Sanctuary" feels layered and alive.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders (`#000` or `#CCC`) for sectioning. Structural boundaries must be defined solely through background color shifts. Use `surface-container-low` for a section sitting on a `surface` background. If you need a container to pop, use `surface-container-lowest` (pure white) against a `surface` (soft gray) backdrop.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper.
- **Layer 0 (Base):** `surface` (#f7f9fb)
- **Layer 1 (Subtle Inset):** `surface-container-low` (#f2f4f6) for background groupings.
- **Layer 2 (The Hero Card):** `surface-container-lowest` (#ffffff) for primary data points.
- **Layer 3 (The Interactive Element):** `surface-bright` (#f7f9fb) for active states.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat," use **Glassmorphism** for floating action buttons or sticky headers. 
- **Token:** `surface-container-lowest` with 80% opacity and a `24px` backdrop-blur. 
- **Signature Textures:** Apply a subtle linear gradient to primary CTAs: `primary` (#006e2f) to `primary-container` (#22c55e). This provides a "glow" that feels healthy and energetic.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display) with **Inter** (Body) to balance personality with clinical legibility.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Daily Glucose Averages (High Impact) |
| **Headline** | `headline-md` | Manrope | 1.75rem | Section titles (e.g., "Insights for Today") |
| **Title** | `title-lg` | Inter | 1.375rem | Sub-headings and Card titles |
| **Body** | `body-lg` | Inter | 1rem | General reading and health advice |
| **Label** | `label-md` | Inter | 0.75rem | Micro-data and timestamps |

**The Typographic Tension:** Always pair a `display-lg` value (like a blood sugar number) with a `label-md` (the unit "mg/dL"). The contrast in scale creates a sophisticated, editorial hierarchy that makes data easy to scan at a glance.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We use **Ambient Softness** to create trust.

*   **The Layering Principle:** Avoid shadows for static content. Instead, use the `surface-container` tiers. A `surface-container-highest` button on a `surface-container-low` card provides all the contrast needed without visual clutter.
*   **Ambient Shadows:** For "floating" elements (e.g., a glucose logging button), use a diffused shadow: 
    *   *Blur:* 40px, *Y-Offset:* 12px.
    *   *Color:* Use a 6% opacity version of `on-surface` (#191c1e). This mimics natural light.
*   **The Ghost Border:** If a boundary is strictly required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Signature Components

### Buttons & Targets
*   **Primary CTA:** Uses the `xl` (3rem) corner radius. Height should be a minimum of `12` (4rem) to ensure a large, accessible tap target. Use the "Signature Gradient" (Primary to Primary-Container).
*   **Secondary:** Ghost style using the "Ghost Border" rule.

### Modern Health Cards
*   **Corner Radius:** Always use `lg` (2rem) or `xl` (3rem). 
*   **Constraint:** No dividers. Separate content using `spacing-6` (2rem) or a subtle shift from `surface-container-lowest` to `surface-container-low`.

### The "Glance" Chip
Used for metabolic states (e.g., "In Range," "High"). 
*   **Style:** No border. Use `primary-container` background with `on-primary-container` text for "In Range." Use `tertiary-container` for "High."

### Input Fields
*   **The "Soft Input":** Fields should not look like boxes. Use a `surface-container-high` background with an `xl` corner radius. The label (`label-md`) should float 0.5rem above the input, never inside it, to maintain a clean "Form as Document" feel.

### Specialized Component: The Glucose Trend Curve
*   A custom sparkline component. Avoid sharp angles. Use a thick, 4pt stroke with "Rounded" caps. The area under the curve should use a soft gradient of `primary-fixed-dim` to transparent.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. For example, a `headline-lg` might have a `spacing-8` left margin but a `spacing-12` top margin to create "breathing room."
*   **Do** use `primary` for positive health outcomes and `tertiary` (Warm Red/Orange) for warnings. Avoid "Neon" reds; stay within the sophisticated `tertiary` tones.
*   **Do** prioritize `surface-container-lowest` for cards containing actionable data.

### Don't
*   **Don't** use 1px dividers. If you feel the need to separate two items, increase the spacing to `spacing-4` or change the background tone.
*   **Don't** use standard "Material Blue" for links. Use `secondary` (#006a61) for a more professional, medical-teal feel.
*   **Don't** use sharp corners. Even "small" components like checkboxes must use the `sm` (0.5rem) roundedness to maintain the "Sanctuary" vibe.