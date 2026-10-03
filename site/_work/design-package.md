# Lantern & Co. Design Package (Tier 1)

## 1. Brand premise
**Lantern.** You don't need to see the whole road. You need enough light for the next few steps. Lantern & Co. helps tired small-business owners see their next 90 days clearly, in plain words. Every section lights one more step, and the page ends at one warm, open door: a free 20-minute call.

Fictional brand. Portland, Oregon. Clients are owners of small local businesses (cafés, shops, studios, trades) who are worn out from doing everything themselves.

## 2. Palette (direction now, final values sampled from approved footage)
```css
:root{
  --canvas:#1F1A24;        /* dusk plum, deep, never pure black */
  --panel:#2E2433;         /* raised dusk */
  --accent:#E8A04C;        /* lantern amber, CTA only */
  --accent-hover:#F2B567;
  --accent-muted:rgba(232,160,76,.18);
  --text-secondary:#C9BBA8;
  --text-primary:#F4EBDD;  /* warm cream */
  --sage:#8FA58A;          /* quiet support color */
  --terracotta:#C66B4E;    /* rare warmth, small marks */
}
```

## 3. Type trio
- Display: **Fraunces**, 400 and 600, with the SOFT axis on for friendliness.
- Body: **Karla**, 400 and 500.
- Labels: **DM Mono**, 400, uppercase, letterspaced.

## 4. Band map (starting points, flick test validates)
| Band | Range | Footage moment | Copy (verbatim) | Entrance |
|---|---|---|---|---|
| 1 | 0.00 to 0.22 | High in the trees at dusk, lanterns glowing above | "Running a small business can feel like walking in the dark." | soft fade up, like a wick catching |
| 2 | 0.26 to 0.50 | Camera drifts down past swaying lanterns | "You don't need to see the whole road." | slow rise with warm glow |
| 3 | 0.54 to 0.76 | Lanterns thin out, the garden table comes into view | "Just enough light for the next few steps." | letters warm from dim to bright |
| 4 (settle) | 0.82 to 1.00 | Rest on the table: notebook, steaming tea, lantern glow | "Lantern & Co. Small-business help, in plain words." + button "Book a free 20-minute call" | gentle lift, button glows once |

Text lives left of center; the lantern column and table stay in the center-right lane.

## 5. Static hero copy (phones, reduced motion)
- Headline: "Enough light for the next few steps."
- Subline: "Lantern & Co. helps small-business owners find a clear 90-day plan, in plain words."
- CTA: "Book a free 20-minute call"

## 6. Below the fold
1. **Sound familiar?** (pain, in owners' words)
   - "I'm doing everything myself."
   - "I'm tired, and the business can tell."
   - "I'm too close to see what's wrong."
   Line under: "You're not bad at this. You're just carrying all of it alone."
2. **How it works** (3 steps, each with a still)
   1. "A free 20-minute call. You talk, we listen. No pitch."
   2. "One working session. We look at your numbers, your week, and your customers."
   3. "Your 90-day plan. One page, plain words, three things to do first."
3. **Interactive moment: Light your next step.** Three small lanterns, each labeled with a common worry ("Cash is tight", "No time", "Sales are flat"). Tap one and it lights, revealing a one-line first step for that worry.
   - Cash is tight: "Find the three costs you forgot you were paying."
   - No time: "Pick the one task only you can do. Hand off or drop the rest."
   - Sales are flat: "Call your five best customers and ask what brought them in."
4. **Plain prices**
   - Free call: $0, 20 minutes.
   - The Lantern Plan: $450, one session plus your one-page 90-day plan.
   - Monthly check-ins: $200 a month, cancel anytime.
   Line: "No contracts. No jargon. If the plan doesn't help, you don't pay for it."
5. **Kind words** (example testimonials, labeled as examples)
   - "For the first time in two years I know what Monday looks like." Maya, café owner (example)
   - "No buzzwords. Just a list I could actually do." Dev, bike shop (example)
6. **Questions**
   - "Isn't this expensive?" "The first call is free, and the plan is a fixed $450. You know the price before we start."
   - "Will I get generic advice?" "We only work with small local businesses. Your plan is built from your numbers and your week."
   - "I don't have time for this." "That's usually the problem we fix first. The whole plan takes about three hours of your time."
   - "What if it doesn't work?" "If the plan doesn't help, you don't pay for it."
7. **Book your free call** (form)
   - Labels: "Your name", "Your business", "Email", "What's keeping you up at night?" (optional)
   - Button: "Book my free call"
   - Success: "Thank you. We'll email you within one working day to pick a time."
   - Handling: JS-only success state (invented brand, demo site).
8. **Footer:** "Lantern & Co. is a fictional business made for a demo website. Imagery is AI generated." Small nav links, © line.

## 7. Vector layer
- A thin amber line that draws itself down the page like a lantern string, connecting the three steps.
- Hand-drawn SVG lantern icons for the interactive moment and section markers.
- Whisper-level floating embers (amber dots, very slow, low opacity) in the fixed background layer.
- Reduced motion: lines shown fully drawn, embers still.

## 8. Engineering list
Blob fetch with loading ring, dt-normalized lerp, gated seeks, delta-gated DOM writes, band pacing with flick test, four-layer legibility system, five static-hero gates with change listeners, complete without video, quality floor, all per `references/scrub-pipeline.md`, plus the whole-site-animated standard.

## 9. Copy gate
Every line above ships verbatim. The built page must pass the Phase 9 grep gate (zero em dashes, zero stock words) and the AI-tell sweep before anyone sees it.
