---
description: Only No CSS strategy
---

# Only No CSS Strategy

This document defines the criteria and procedure for applying **Only No CSS**
principles across the frontend.

## Goals
- Do not use CSS files, inline styles, or style attributes.
- Build screens using semantic HTML structure and default browser styling.
- Comply with the approved HTML tag list.

## Principles
- Solve styling by HTML structure itself.
- Do not use `class` or `id` for visual styling.
- Express visual grouping with sectioning and heading hierarchy.
- Rely on tables, lists, and fieldsets for layout structure.
- Prefer native interactive elements like `details/summary`, `dialog`, and form controls.
- Use semantic HTML tags whenever possible; do not use `div` or `span`.
- Use Preact `Fragment` to group siblings without adding extra DOM nodes.
- Use `Portal` for dialogs/toasts that must render outside the parent layout.

## Allowed Tags
- Use only the HTML5 standard tag list (118) defined in project rules.
- Do not use custom elements or web component tags.
- SVG/Math are allowed only within the standard list.

## Scope
- All pages (`routes/**`)
- All components (`components/**`)
- All islands (`islands/**`)

## Procedure
1. **Remove global CSS**
   - Delete `static/*.css`, `assets/*.css`
   - Remove `<link rel="stylesheet" ...>` in `_app.tsx`
2. **Remove style dependencies**
   - Remove `class` and `style` attributes
   - Remove wrapper elements that exist only for layout
3. **Restructure markup**
   - Establish `header`, `main`, `section`, `article`, `footer` hierarchy
   - Use lists, forms, and tables to structure information
4. **Normalize interactions**
   - Replace tabs/toggles with `details/summary`
   - Replace modals with `dialog`
5. **Verify**
   - Check for forbidden attributes and tags
   - Validate against the approved tag list

## Checklist
- [ ] No CSS files
- [ ] No inline styles
- [ ] No `class`/`id` usage
- [ ] Tag list compliance
- [ ] Consistent semantic structure
- [ ] Use `Fragment` instead of layout-only wrappers

## Exceptions
- If an exception is required, document the reason and alternative and get approval.
- Approved exception: minimal adaptive dark mode for usability.
  - Reason: base UI readability in system dark theme.
  - Alternative considered: no styling (rejected due to low contrast).
  - Scope: `static/theme.css` using element selectors only.
