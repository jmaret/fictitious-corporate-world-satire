# Satyre — Product Vision & Requirements

**Status:** Living document  
**Last updated:** September 18, 2026  
**Site:** [satyre.xyz](https://satyre.xyz)

## 1. Product vision

Satyre is a lightweight stage for short-form visual satire and reflective storytelling about everyday systems. It privileges sharp writing and cartoons over platform complexity: publish quickly, read easily, let the piece carry the point.

The product exists to:

- Curate ongoing collections of cartoons and chronicles that feel cohesive but standalone.
- Contrast **fictitious** exaggeration (corporate and civilian satire) with **reflective** intimacy (relationship chronicles).
- Stay small enough that adding a new piece is a content change, not an engineering project.

## 2. Audiences

| Audience | Need |
| --- | --- |
| Casual visitors | Fast load, clear collections, enjoyable browsing on phone and desktop |
| Returning readers | Newest work first; obvious collection switching |
| Creator / publisher | Minimal ceremony to ship new cartoons, copy, and release notes |

## 3. Collections (requirements)

### 3.1 Fictitious Corporate World Satire

- **Tone:** Cynical, funny, pointed about workplace theater.
- **Surface:** Image-first cards (cartoon + title + series label).
- **Interaction:** Click cartoon (or author thumbnail elsewhere) opens shared lightbox.

### 3.2 Fictitious Civilian Life Satire

- **Tone:** Familiar absurdity of errands, group chats, municipal-adjacent life.
- **Surface:** Same image-first card pattern as corporate.
- **Interaction:** Same lightbox behavior.

### 3.3 Fictitious Relationship Chronicles

- **Tone:** Reflective; at times funny; at times poignant.
- **Surface:** **Verbiage-first** cards (title + short reflective paragraph + series label + “View cartoon” affordance). No visible thumbnail by default.
- **Interaction:** Click (or Enter/Space on focused card) opens shared lightbox with the cartoon.
- **Scaffold:** Until a cartoon exists, cards may use `data-cartoon-pending`; lightbox shows title + “Illustration forthcoming.”

## 4. Cross-cutting product requirements

| ID | Requirement |
| --- | --- |
| P1 | Shared sticky nav with branding, collection tabs, version info, and contact email—visible from every tab |
| P2 | Each collection has a hero (eyebrow, title, short framing copy) plus a responsive gallery grid |
| P3 | Newest pieces are prepended so the first row is always the latest work |
| P4 | Version control in the nav exposes version, latest-change notes, and deploy timestamp **with timezone** |
| P5 | Experience must work without a build step, login, or backend |
| P6 | Styling across tabs remains congruent (same chrome, card shell, accent language) even when content patterns differ |
| P7 | Mobile and desktop layouts remain usable (gallery 1 / 2 / 3 columns by breakpoint) |
| P8 | Accessibility basics: tab buttons with `aria-selected`, modal dialog semantics, keyboard close (Escape), chronicle cards operable by keyboard |

## 5. Non-goals

- User accounts, comments, CMS, or analytics-heavy product surface
- Framework / SPA rewrite
- Backend APIs or dynamic content servers
- Turning Relationship Chronicles into image-first satire cards (verbiage leads by design)

## 6. Success criteria

- A visitor can switch collections and understand the tone of each within one viewport of hero copy.
- A new cartoon or chronicle can be added by editing static files and merging to `main`.
- Release notes in the version popover accurately describe what just shipped and when.

## 7. Document maintenance

This file is kept current by project Cursor rules whenever product behavior, collections, content patterns, or release practices change. Update **Last updated** when revising.
