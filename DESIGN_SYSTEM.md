# MODERN BOTANICAL DESIGN SYSTEM & WHITE-LABEL ARCHITECTURE
**杏心露茶 (RED TEA × APRICOT × MILK CREAM × MATCHA)**

Foundation Design System & White-label Template tailored for the **FER202** Practical Exam (Next.js 16 App Router, TypeScript, Tailwind CSS v4, ShadCN UI with Base UI & Nova preset).

---

## 1. Design Philosophy

The **杏心露茶** design system brings a modern, warm, Asian-editorial aesthetic:
- **Warm & Sophisticated**: Rich Red Tea accents (`#9E4743`) paired with soothing Matcha Green (`#7C966A`), gentle Apricot (`#F0D290`), and airy Milk Cream (`#FBFFE4`).
- **Zero Stark White & Zero Muddy Tone**:
  - *Main Background (`#FBFFE4`)*: A light, refreshing milk-cream tone that eliminates harsh sterile white and dull mustard yellow.
  - *Card Surface (`#F7EFE1`)*: Warm apricot-cream canvas with soft edges.
  - *Inputs (`#FDF9F0`)*: Seamlessly integrated with card surfaces, with Chrome autofill overrides preventing blue tinting.
- **High-Contrast Editorial Typography**: Playfair Display titles rendered in Red Tea (`#9E4743`), paired with clean Montserrat body copy in Warm Charcoal/Dark Wood (`#3E3228`).
- **Accessibility & Contrast**: All text-to-background combinations meet or exceed WCAG AA/AAA standards (> 5:1 for headings, > 9:1 for body copy).

---

## 2. Color Palette Tokens

| Token Name | HEX | CSS Variable | ShadCN Mapping | Purpose |
|---|---|---|---|---|
| **Milk Cream** | `#FBFFE4` | `--milk-cream` | `--background`, `--primary-foreground` | Main page background, button text |
| **Warm Apricot Card**| `#F7EFE1` | `--card` | `--card`, `--popover` | Card canvas, auth boxes, summary containers |
| **Mellow Apricot** | `#F0D290` | `--apricot` | `--secondary` | Category badges, tag highlights |
| **Matcha Green** | `#7C966A` | `--matcha` | `--primary`, `--ring` | Primary action buttons, active borders, focus ring |
| **Red Tea** | `#9E4743` | `--tea-red` | `--accent`, `--destructive` | Editorial titles (H1-H6), total amounts, delete buttons |
| **Dark Wood** | `#3E3228` | `--wood-dark` | `--foreground`, `--card-foreground` | Primary body text and form labels |
| **Tea Smoke Border** | `#D8C8B4` | `--border` | `--border`, `--input` | Subtle dividers and input borders |

---

## 3. Automated Test Verification (FER202 SpendWise)

- **50/50 test IDs** strictly preserved across all routes:
  - Header: `btn-login`, `btn-register`, `user-email`, `link-expenses`, `btn-logout`
  - Home: `home-title` ("SpendWise")
  - Auth: `login-form`, `register-form`, `login-submit`, `register-submit`, `error-email`, `error-password`, `error-confirm-password`, `error-auth`, `form-success`
  - Expenses: `expenses-page`, `expense-form`, `input-amount`, `select-category`, `input-date`, `input-note`, `btn-add-expense`, `error-amount`, `error-category`, `error-date`, `error-note`, `error-expense`, `expense-success`, `expense-list`, `expense-item`, `expenses-empty`, `filter-category`, `filter-month`, `btn-clear-filters`, `total-amount`, `expense-count`, `category-breakdown`, `breakdown-row`, `breakdown-name`, `breakdown-amount`, `btn-delete-expense`
- **16/16 exact text messages** match case-sensitive expectations.
- **Conditional rendering**: Error and success tags only render in the DOM when active.
- **Protected route**: Zero flash of unauthenticated content.
