# WGMS Case Study — 5-Pillar Analysis Framework

## Overview

Every case study is analyzed across exactly 5 pillars. Each pillar maps to a section in the output document. Work through them in order before generating any document content.

---

## Pillar 1: Technical Challenge

**Goal:** Identify the root cause(s) and categorize the error type.

### Error Type Taxonomy

| Category | Examples | Typical Cause |
|---|---|---|
| Path Conflict | "Archive path is invalid" | Non-standard host directory mapping |
| Parameter Validation | "Parameter validation error" | Partial domain propagation, ambiguous root paths |
| Authentication Block | OTP/2FA prompt despite disabled | Host-level 2FA layers separate from WP 2FA |
| Timeout / Memory | Stuck at high % completion | Large backup, low server memory, host throttling |
| Database Mismatch | DB errors post-import | Version differences between source/destination DB |
| Host Restriction | Import tool blocked | Managed hosts (WPEngine, GoDaddy Managed, WordPress.com) |
| Non-Duplicator Backup | Customer used different backup tool | Files exist but not in Duplicator archive format |

### Questions to Answer

1. What was the exact error message or symptom?
2. Which ticket number surfaced it (initial inquiry vs. post-sale)?
3. Was it a known host-specific issue? (See host catalog below)
4. How was it ultimately resolved?

### Host-Specific Known Issues

**Hostinger:**
- Non-standard directory mapping causes path validation errors in Step 1 (Upload) and Step 2 (Confirmation)
- Partial domain propagation creates dual-path conflicts → provision fresh clean environment
- 2FA can persist at host level even after WP 2FA is disabled

**WPEngine:**
- Restricted environment — Duplicator import tools often blocked
- Requires manual file transfer via SFTP

**GoDaddy Managed WordPress:**
- cPanel access limited or unavailable
- Backup restoration often requires workarounds via staging

**WordPress.com:**
- Export is only partial (no plugins, limited themes)
- Full migration requires different workflow

---

## Pillar 2: Sales Pivot

**Goal:** Identify the exact conversion moment and the strategy used.

### Pivot Pattern Types

| Pattern | Description | When It Works |
|---|---|---|
| Embedded Upsell | WGMS link added at bottom of troubleshooting reply | Customer is stuck mid-DIY |
| Deadline Urgency | Mirror customer's stated urgency back at them | "Time is of the essence" signals |
| Objection-to-Discount Close | Validate frustration + discount + purchase link in one reply | Prior spend objection |
| Feature Reframe | Explain Duplicator Pro is required BY US, not duplicating their cost | "I already bought X" objection |
| Risk Mitigation | Emphasize zero-downtime, professional handling | eCommerce / revenue site owners |

### Conversion Sequence to Document

1. What was the customer's emotional state at conversion moment?
2. What objection (if any) needed to be cleared?
3. What exact phrase or strategy was used?
4. Was a discount applied? (WGMS30 = 30%, COMPLETE60OFF = 60% on Pro license)
5. Was the purchase link included in the same message as the offer? (best practice: YES)

### Key Phrases That Convert

- `"If you'd prefer our paid hands-off migration, our experts can handle everything for you in 24-72 hours."`
- `"Duplicator Pro is a requirement for our White Glove Migration Service — our experts use it as the core tool."`
- `"To make things right, I'd like to offer you a 30% discount on our White Glove Migration Service."`
- `"Time is of the essence — once you purchase, we start immediately."`

---

## Pillar 3: Execution & Delivery

**Goal:** Document exactly how the migration was performed post-sale.

### Standard Execution Checklist

For each case, note which steps were standard and which had deviations:

**Pre-Migration (Source):**
- [ ] Source site confirmed functioning
- [ ] Duplicator Pro up to date on source
- [ ] PHP versions matched source ↔ destination
- [ ] Database versions matched
- [ ] Memory ≥ 150MB confirmed
- [ ] Custom/cache plugins noted
- [ ] Coming soon page activated (if eCommerce/membership)

**Pre-Migration (Destination):**
- [ ] Standard PHP/server modules confirmed
- [ ] 3× backup size storage available
- [ ] Clean database and root folder confirmed
- [ ] Bandwidth checked if possible

**Execution:**
- [ ] Backup archive identified and validated
- [ ] Migration tool / method confirmed (Duplicator vs. direct file transfer)
- [ ] Any environment changes made (fresh server provisioned, etc.)

**Post-Migration Audit:**
- [ ] Site loads correctly at destination URL
- [ ] DB, files, configs verified
- [ ] Frontend review completed
- [ ] Admin login tested
- [ ] Images and links checked

### Deviations to Flag

Document any step that deviated from standard and WHY. These become training lessons.

---

## Pillar 4: Crisis Management

**Goal:** Catalog any mid-migration problems and the exact recovery strategy.

### Crisis Response Principles

1. **Shield the customer from complexity** — resolve first, explain after
2. **Never stall** — always have a next action ready
3. **Pivot immediately** — if one path is blocked, take another without asking for permission
4. **Explain post-resolution** — use plain language, optionally with a visual guide

### Crisis Documentation Format

For each crisis encountered, document:

```
Crisis Type: [2FA Block / Server Conflict / DB Error / etc.]
Trigger: [What caused it]
Customer Impact: [Did they experience delay? Were they informed?]
Resolution: [Exact steps taken]
Communication: [What was said to the customer and when]
Outcome: [Resolved / Escalated / Workaround used]
```

### Common Crisis Patterns

| Crisis | Resolution |
|---|---|
| 2FA blocking live site access | Pivot to backup archive immediately; inform customer simply |
| Server path conflict | Provision fresh clean environment; migrate there |
| Wrong package purchased | Check EDD widget; address mismatch before starting |
| Backup corrupted / incomplete | Request new backup from source; offer to create one |
| Destination DB not cleared | Clear manually via phpMyAdmin or cPanel |

---

## Pillar 5: Win/Loss Assessment

**Goal:** Produce a scored summary of what worked and what to learn.

### Scoring Categories

| Category | Win Condition | Loss / Lesson Condition |
|---|---|---|
| Technical Diagnosis | Root cause correctly identified first try | Misdiagnosed or took multiple attempts |
| Sales Pivot | WGMS upsell offered at the right moment | Missed opportunity or pushy timing |
| Objection Handling | Objection cleared in same reply | Required multiple back-and-forth exchanges |
| Execution Speed | Migration completed within quoted timeframe | Exceeded timeframe |
| Crisis Response | Customer shielded from complexity | Customer experienced visible confusion or delay |
| Communication Clarity | Post-migration explanation was clear and visual | Customer had follow-up questions about what happened |
| Post-Migration Follow-up | Review requested within 48-72 hours | Delayed or omitted |
| Urgency Matching | Team pace matched customer's stated urgency | Team was slower than customer expected |

### Output Format for Document

Each category gets a row in the Win/Loss table with three columns:
- **Category** — the area assessed
- **Result** — what actually happened (one sentence)
- **Assessment** — WIN or LESSON LEARNED: [brief note]
