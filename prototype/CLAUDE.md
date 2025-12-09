# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a FamilySearch family tree prototype built with static HTML/CSS and vanilla JavaScript. The project demonstrates two key features:
1. **Family Tree Viewer** (index.html) - An interactive portrait-view genealogy tree with navigation controls
2. **Merge by ID Interface** (merge.html) - A comparison tool for merging duplicate family tree records

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- No build tools, no frameworks, no package manager
- Browser images (male.png, female.png) used for avatars

## File Structure

```
prototype/
├── index.html          # Family tree viewer with side sheet for potential person review
├── page2.html          # Placeholder page
├── merge.html          # Merge by ID comparison interface
├── styles.css          # Styles for index.html
├── merge-styles.css    # Styles for merge.html
├── male.png           # Male avatar placeholder
└── female.png         # Female avatar placeholder
```

## Development Commands

This is a static HTML project - no build process required.

**To run locally:**
Open HTML files directly in a browser, or use any static file server:
```bash
python3 -m http.server 8000
# Then open http://localhost:8000/index.html or merge.html
```

## Architecture & Design Patterns

### FamilySearch Design System

Both pages follow FamilySearch's design language:
- **Primary font**: Verdana (fallback to Arial, sans-serif)
- **Background**: #DDDFDF (light gray)
- **Primary text**: #202121 (near black)
- **Brand green**: #5b9552 (logo), #A7C41A (avatars)
- **Brand blue**: #39AECB (selected states), #066F90 (info icons)
- **Alerts**: #F57C00 (warning orange), #D32F2F (error red)

### Layout Patterns

**index.html - Three-level tree structure:**
- Level 1: Potential couple + Focus couple (top row)
- Level 2: Two grandparent couples (middle row)
- Level 3: Focus couple at bottom
- SVG connectors link generations vertically and horizontally
- Navigation arrows allow cycling through multiple couples at each position

**merge.html - Three-column comparison grid:**
- Column 1: "Duplicate one" (gray background #E8EEF0)
- Column 2: "Duplicate two" (white background)
- Column 3: "Resulting Person" (blue background #E1F4F7)
- Checkboxes in columns 1-2 control which data appears in column 3
- Mutually exclusive checkboxes per row - only one can be selected at a time

### JavaScript Patterns

All JavaScript is inline in `<script>` tags at the end of each HTML file:

**index.html:**
- `openSideSheet()` / `closeSideSheet()` - Toggle side panel overlay
- `showMainScreen()` / `showCompareScreen()` - Switch between side sheet views
- `addPersonToTree()` - Populate the comparison screen's right column
- Escape key listener for closing side sheet

**merge.html:**
- Checkbox event handlers ensure mutual exclusivity within rows
- Dynamic updates to "Resulting Person" column based on selections
- Info icon tooltips that open/close on click
- Person card radio button updates

### Component Patterns

**Person Cards:**
- `.person-card` - Main container
- `.person-avatar` or `.avatar-container` - Circular image wrapper
- `.person-name` - Name (often split across two lines with `<br>`)
- `.person-dates` - Birth-death years
- `.person-id` - FamilySearch ID (format: XXXX-XXX)
- Special states: `.focus`, `.potential`, `.clickable`

**Family Members:**
- `.family-member` - Row with avatar + name + dates
- `.family-name` - Bold member name
- `.family-dates` - Dates and ID, color #666

**Badges & Alerts:**
- `.potential-badge` - "Potential" label on unconfirmed records
- `.new-badge` - "New" indicator for recent discoveries
- `.merge-warning` / `.inconsistencies-alert` - Warning banners with icons

## Key Implementation Details

### Side Sheet Overlay (index.html)
The side sheet is a fixed-position panel that slides in from the right. It has two screens:
1. Main screen - Shows potential person details with REVIEW/IGNORE buttons
2. Compare screen - Two-column comparison with ADD button to populate right side

Navigation between screens is handled by toggling `display: flex` / `display: none`.

### Merge Grid Layout (merge.html)
The three-column grid uses a custom CSS Grid layout where:
- Section headers span all 3 columns
- Data rows have 3 cells aligned to columns
- Some sections (like "Inconsistencies") have special spanning behavior
- The Death section extends to accommodate an alert banner beneath it

### Checkbox Behavior (merge.html)
JavaScript enforces "radio button-like" checkbox behavior:
- Only one checkbox per row can be selected
- Clicking a checked checkbox does NOT uncheck it (prevented with `e.preventDefault()`)
- When a checkbox is clicked, all others in the same row are unchecked
- The "Resulting Person" column updates dynamically to reflect selections

### Connector Lines (index.html)
Family tree connectors are CSS pseudo-elements positioned absolutely:
- `.connector-up` - Vertical line from couple to parent
- `.connector-down` - Vertical line from couple to child
- `.connector-join-horizontal` - Horizontal line joining two couples
- `.connector-up-from-person` - Line from specific person (Raymond) to parents

## Styling Approach

- **No CSS preprocessor** - Plain CSS with standard selectors
- **Component-based naming** - `.person-card`, `.family-member`, `.btn-review`, etc.
- **State classes** - `.active`, `.focus`, `.potential`, `.clickable`
- **Inline styles** used sparingly for one-off adjustments (margins, specific nested layouts)
- **Flexbox** preferred for most layouts, **Grid** for the merge comparison table

## Images

- `male.png` and `female.png` are placeholder avatar images
- Used extensively throughout both pages for person representations
- SVG icons used for UI controls (arrows, settings, info icons, etc.)

## Git Workflow

Recent commits show incremental visual refinements:
- Color adjustments to match design specs
- Layout fixes for the inconsistencies alert area
- Name display corrections (e.g., removing/adding middle names)

When making changes, follow the existing pattern of small, focused commits describing visual or functional changes.
