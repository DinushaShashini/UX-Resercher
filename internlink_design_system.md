# InternLink Design System
### Modern SaaS Design Tokens, Core Component Specifications, and Style Guide

---

## 1. Design Token Philosophy
InternLink uses a tokens-first approach to UI development. All design values (colors, spacing, typography, borders, and shadows) are standardized as custom properties (variables) to maintain absolute consistency across the web application and mobile views.

```
                  ┌──────────────────────────────────────────┐
                  │              Design Tokens               │
                  └────────────────────┬─────────────────────┘
                                       │
      ┌──────────────────┬─────────────┴──────┬──────────────────┐
      ▼                  ▼                    ▼                  ▼
┌───────────┐      ┌───────────┐        ┌───────────┐      ┌───────────┐
│  Colors   │      │  Spacing  │        │Typography │      │ Elevation │
└─────┬─────┘      └─────┬─────┘        └─────┬─────┘      └─────┬─────┘
      │                  │                    │                  │
      ├─ Light Mode      ├─ 8pt Grid          ├─ Scale (rem)     ├─ Shadows
      └─ Dark Mode       └─ Clamp (Mobile)    └─ Line Heights    └─ Border Radius
```

---

## 2. Color System
Our color palette is crafted for a professional, trustworthy, and modern digital platform. It utilizes the requested primary indigo, secondary cyan, and success emerald colors, supported by balanced grays.

### CSS Custom Properties (Tokens)
```css
:root {
  /* Primary (Indigo) - Brand identity, major CTAs, active states */
  --color-primary-50:  #EEF2FF;
  --color-primary-100: #E0E7FF;
  --color-primary-500: #4F46E5; /* Brand Primary */
  --color-primary-600: #4338CA;
  --color-primary-700: #3730A3;

  /* Secondary (Cyan) - Accent elements, focus rings, highlights */
  --color-secondary-50:  #ECFEFF;
  --color-secondary-100: #CFFAFE;
  --color-secondary-500: #06B6D4; /* Brand Secondary */
  --color-secondary-600: #0891B2;

  /* Success (Emerald) - Approved statuses, offers, active matching */
  --color-success-50:  #ECFDF5;
  --color-success-500: #10B981; /* Brand Success */
  --color-success-700: #047857;

  /* Semantic Alerts */
  --color-warning-50:  #FFFBEB;
  --color-warning-500: #F59E0B; /* Pending / Calendar deadline */
  --color-danger-50:   #FEF2F2;
  --color-danger-500:  #EF4444;  /* Rejected / Error */

  /* Neutral Grays (Light Mode) */
  --color-bg-base:      #FFFFFF;
  --color-bg-surface:   #F8FAFC;
  --color-border:       #E2E8F0;
  --color-text-primary: #0F172A;
  --color-text-muted:   #64748B;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Neutral Grays (Dark Mode) */
    --color-bg-base:      #0F172A;
    --color-bg-surface:   #1E293B;
    --color-border:       #334155;
    --color-text-primary: #F8FAFC;
    --color-text-muted:   #94A3B8;
  }
}
```

---

## 3. Typography System
InternLink uses a geometric sans-serif typeface—**Inter** or **Outfit**—to ensure readability on screens of all sizes.

### Font Scales & Settings

| Token Name | Font Size (Desktop) | Font Size (Mobile) | Line Height | Font Weight | Usage Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--font-size-h1` | `2.25rem` (36px) | `1.75rem` (28px) | `1.2` | `700` (Bold) | Marketing Landing Hero |
| `--font-size-h2` | `1.50rem` (24px) | `1.25rem` (20px) | `1.3` | `600` (SemiBold) | Dashboard Section Titles |
| `--font-size-h3` | `1.25rem` (20px) | `1.125rem` (18px) | `1.4` | `600` (SemiBold) | Modal Headers / Card Titles |
| `--font-size-body` | `1.00rem` (16px) | `0.937rem` (15px) | `1.5` | `400` (Regular) | Paragraphs, job listings |
| `--font-size-sm` | `0.875rem` (14px) | `0.812rem` (13px) | `1.5` | `500` (Medium) | Meta Badges, table fields |
| `--font-size-xs` | `0.75rem` (12px) | `0.75rem` (12px) | `1.4` | `600` (SemiBold) | Overlines, micro-labels |

---

## 4. Spacing System
Built on a strict **8px base grid** (0.5rem) to ensure structured visual alignment.

| Spacing Token | Value (px / rem) | Common UI Application |
| :--- | :--- | :--- |
| `--space-xs` | `4px` / `0.25rem` | Badge padding, icon gap in buttons |
| `--space-sm` | `8px` / `0.5rem` | Between list items, label-to-input gap |
| `--space-md` | `16px` / `1.0rem` | Padding inside cards, list container margin |
| `--space-lg` | `24px` / `1.5rem` | Outer page margins (mobile), card-to-card gap |
| `--space-xl` | `32px` / `2.0rem` | Hero margins, dashboard card column padding |
| `--space-xxl`| `64px` / `4.0rem` | Landing page section spacing |

---

## 5. Border Radius & Shadows (Elevation)

### Border Radius
```css
--radius-sm: 4px;   /* Checkboxes, small tags, tooltips */
--radius-md: 8px;   /* Input fields, small buttons, status pills */
--radius-lg: 12px;  /* Default Cards, Kanban columns, Modals */
--radius-xl: 16px;  /* Large panels, upload zones */
--radius-full: 9999px; /* Pill buttons, avatar rings */
```

### Elevation (Box Shadows)
* **Low (Interactive Elements / Buttons):**
  `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);`
* **Medium (Job Cards / Dropdowns):**
  `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);`
* **High (Modals / Sidebar panels):**
  `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.08);`

---

## 6. Core Components

### A. Buttons

```
  Primary Button                  Secondary Button                Outline Button
  ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
  │      [Apply Now]       │      │   [Save to Tracker]    │      │       [Cancel]         │
  └────────────────────────┘      └────────────────────────┘      └────────────────────────┘
  Solid Indigo (#4F46E5)          Light Gray Surface              Transparent Base
  White Text                      Charcoal Text                   Gray Border / Text
```

* **Primary Button:**
  * Background: `--color-primary-500` (#4F46E5) | Hover: `--color-primary-600`
  * Text: `#FFFFFF` | Radius: `--radius-md`
* **Secondary Button:**
  * Background: `--color-bg-surface` | Hover: `--color-border`
  * Text: `--color-text-primary`
* **Outline Button:**
  * Background: `transparent` | Border: `1px solid --color-border`
  * Text: `--color-text-primary` | Hover: Background `--color-bg-surface`
* **Accessibility Guidelines:** Minimum click-target size of **44px x 44px** on mobile. Focused buttons must display a outline focus ring: `outline: 2px solid --color-secondary-500; outline-offset: 2px;`.

---

### B. Input Fields & Form Components
* **Text Input:**
  * Border: `1px solid --color-border` | Background: `--color-bg-base`
  * Focus: Border `--color-primary-500` and subtle outer shadow glow: `box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);`
  * Error State: Border `--color-danger-500` with descriptive red helper text below.
* **Checkbox & Radio Buttons:**
  * Size: `16px x 16px`. Active fill: `--color-primary-500`.
  * Visual label to left or right must have a gap of `--space-sm`.

---

### C. Cards
* **Layout Structure:**
  * Container Background: `--color-bg-surface` (or Base depending on theme setup).
  * Border: `1px solid --color-border`.
  * Padding: `--space-lg` (24px) for desktop; `--space-md` (16px) for mobile.
* **Hover Interaction:** Transition transform scale up (`scale: 1.01`) and increase drop shadow depth to `Medium` elevation over a `150ms ease-out` transition duration.

---

### D. Tables & Datagrids
* **Table Header:** Background `--color-bg-surface`, text color `--color-text-muted`, text weight `600`, size `--font-size-xs` (All-Caps).
* **Table Rows:** Padding top/bottom `--space-md`. Bottom border `1px solid --color-border`.
* **Row Hover State:** Highlight row background with `--color-primary-50` (or local dark mode alternative) to focus reader attention.

---

### E. Navigation Elements
* **Left Sidebar (Desktop):**
  * Width: `260px` | Background: `--color-bg-surface` | Border Right: `1px solid --color-border`.
  * Active Navigation Row: Left vertical colored block (`3px width`, `--color-primary-500`), background tint of `--color-primary-50`, text color `--color-primary-600` (Bold).
* **Bottom Tab Bar (Mobile):**
  * Height: `64px` | Background: `--color-bg-base` | Border Top: `1px solid --color-border`.
  * Icons: `24px` vector svgs. Active icon filled with `--color-primary-500`, inactive is `--color-text-muted`.

---

## 7. Iconography & Visual Assets
* **System Icon Library:** Recommended **Lucide-React** or **Heroicons (Outline)**.
* **Stroke Weights:** Use a uniform stroke width of `2px` for all icon lines to maintain layout consistency.
* **Size Grid:**
  * Small: `16px` (inside buttons, badges).
  * Medium: `24px` (navbars, core dashboard metrics).
  * Large: `32px` (empty state alerts, upload illustration indicators).

---

## 8. Accessibility & Semantics (WCAG 2.1 AA)
* **Contrast Compliance:** All text-to-background combinations must exceed the contrast ratio of **4.5:1** for standard size, and **3.0:1** for large text size.
* **Screen Reader tags:**
  * All input fields must be programmatically linked to their corresponding labels using `<label for="[id]">`.
  * All non-text visual icons (e.g., bell icon, edit pencils) require explicit `aria-label` tags (e.g. `aria-label="Edit Profile"`).

---
*InternLink Design System — Modern SaaS Style Guide. All rights reserved.*
