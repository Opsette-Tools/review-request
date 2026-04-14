

# Review Request Generator — Implementation Plan

## Overview
A mobile-first tool for service professionals to generate personalized review request messages, copy them to clipboard, and track which clients they've asked.

## 1. Setup & Configuration
- **First-launch setup flow**: Modal/sheet that collects Business Name, Google Review URL, Yelp Review URL, preferred platform, and Owner first name
- **Settings page**: Accessible via gear icon in top bar, pre-filled with saved values from localStorage
- **Nudge card**: If no review URLs are configured, show a friendly prompt on the main screen

## 2. Design System Overhaul
- **Primary accent**: Warm teal/emerald (~HSL 160, 55%, 45%)
- **Background**: Warm off-white (slate-50 or custom warm gray)
- **Cards**: Pure white, shadow-sm, rounded-2xl, generous p-5/p-6 padding
- **Typography**: tracking-tight headings, tabular-nums on stats, font-medium on pills
- **Status colors**: Emerald (reviewed), Amber (pending), Slate (unknown)
- **Layout**: max-w-md centered column, mobile-first (375px primary target)

## 3. Main Page — Message Generator
- **Client name input**: Large, prominent text input at top
- **Service type input**: With recent suggestions dropdown (stored in localStorage)
- **Template picker**: Horizontal scrollable pill/chip selector with smooth transition animations. 5 built-in templates + any user-created custom templates
- **Platform toggle**: Google / Yelp toggle (only shows configured platforms)
- **Live message preview**: iMessage-style chat bubble (rounded-2xl, teal-tinted background, bubble tail). Editable textarea. Review link styled as underlined accent-color link. text-base/text-lg font size
- **Copy to Clipboard button**: Large accent-colored button with scale-95 active press, checkmark icon swap animation on success, toast confirmation
- **Mark as Sent prompt**: After copying, gentle prompt to log the request to history
- **Clear button**: Resets form for next client

## 4. Custom Templates
- "Create Template" option in the template picker area
- Modal/sheet with template name + body using placeholders: [Client Name], [Business Name], [Owner Name], [link], [service type]
- Saved to localStorage, appears alongside built-in templates
- Edit and delete custom templates

## 5. Request History
- Accessible via icon in top bar (opens as a separate view/sheet)
- **Summary stats**: Total requests, reviewed count, conversion rate with animated progress ring
- **Scrollable list**: Sorted by most recent. Shows client name, date, platform icon, review status indicator (⏳/✅/—)
- **Entry detail**: Tap to see sent message, resend, or toggle review status
- **Delete**: Individual entries or clear all
- **Empty state**: Friendly message with icon — "No requests yet"
- Stores last 100 entries in localStorage

## 6. Demo Mode
- "Try Demo" button (visible when form is empty) fills in Sarah Mitchell, deep cleaning, Warm & Personal template, placeholder review URL
- Clearly labeled as demo data with easy clear action

## 7. PWA & Mobile
- `manifest.json` with name, icons, theme_color, background_color, display: standalone for Add to Home Screen
- No service worker (causes issues in Lovable preview; offline support production-only)
- HashRouter for GitHub Pages compatibility
- All touch targets ≥ 44px, no horizontal scroll

## 8. Micro-interactions
- Template pills: duration-200 background transition
- Copy button: scale-95 → checkmark swap with scale animation
- History entries: hover shadow lift (shadow-sm → shadow-md)
- Conversion rate: animated progress ring/arc when > 0%

