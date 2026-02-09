# Specification

## Summary
**Goal:** Improve dashboard readability on the black theme and add a per-time-zone Day/Night status with a color-changing ✦ indicator.

**Planned changes:**
- Adjust UI text colors across the dashboard and time zone selector to ensure all user-visible text (including muted/secondary text and hover states) has sufficient contrast on black surfaces.
- For each time zone card, compute the current local time using its IANA time zone and derive a simple Day vs Night status based on local hour.
- Display a clear "Day" or "Night" label on each time zone card alongside a ✦ symbol that is yellow for Day and blue for Night, and ensure both remain legible on the dark theme.
- Update the Day/Night status automatically as time advances (no page refresh required).

**User-visible outcome:** All text is clearly readable on the black-themed UI, and each time zone card shows a live-updating Day/Night label with a ✦ indicator that turns yellow during Day and blue during Night.
