---
name: wgms-win-report
description: >
  Use this skill to generate a WGMS team win report — a short, conversational, story-driven
  summary of how a ticket was converted into a WGMS sale. The output is formatted for sharing
  in a team Slack channel or internal chat, written in first-person agent voice, and follows
  the pattern: ticket context → reply strategy per email → what was done differently → outcome.

  Trigger this skill when the user:
  - Pastes a WGMS ticket thread and says "write a win report", "share this with the team",
    "make a Slack post about this", "write a team summary", "how I won this ticket"
  - Wants to document their sales approach to share knowledge with teammates
  - Says "create a case study share", "team channel post", "write my win story"
  - Has a converted WGMS ticket ($149/$299/$499) and wants to share the strategy behind it
  - Uses phrases like "share my approach", "how I closed this", "write up what I did"

  Always use this skill — do not attempt WGMS win reports from scratch without it.
  Output is plain text (Slack-ready), NOT a .docx file. Keep it punchy and human.
---

# WGMS Win Report Skill

Generates a **team Slack win report** from a raw WGMS ticket thread. Output is conversational,
first-person, written as if the agent is sharing with teammates — not a formal document.

---

## Output Format

The report has exactly this structure (see `references/output-format.md` for detailed guidance):

```
We have a new WGMS sale - [Size] $[Price]
Ticket URL: [URL if provided]

[1–2 sentence context about the customer and the challenge]

Let me share my experiments and how I win this ticket [from X to Y conversion].

[Optional: credit/thanks if another team member was involved]

[For each email/reply in the thread:]
[Nth] email, Reply Pattern:
* [Key thing done or said]
* [Key thing done or said]
* [Key thing done or said]

[Repeat for each reply...]

[Final close paragraph — what was different, the decisive move, the result]

Sharing with you as a case study, I hope you will get benefited from it in other cases too.
```

---

## Step 1 — Extract from Ticket

Before writing anything, parse the ticket and identify:

```
REQUIRED:
- Ticket URL (if provided by user)
- Service tier purchased: $149 / $299 / $499 → Small / Large / High-Volume
- Conversion path: e.g. "presale → pro license → WGMS" or "DIY failure → WGMS"
- Number of reply rounds before conversion
- Any team member credited (e.g. @Nik)

FOR EACH EMAIL REPLY, identify:
- What the agent's goal was in that reply
- The key moves/phrases/strategies used
- What the customer did or said next

FINAL EMAIL:
- What was done differently vs. standard support
- The decisive tactic that closed the sale
- Any creative or unconventional approach

STRIP ALWAYS:
- Passwords, usernames, login credentials
- Secret links
- Raw credential blocks
```

---

## Step 2 — Determine the Conversion Story Arc

Read `references/conversion-patterns.md` to identify which pattern this ticket follows.

Common arcs:
- **Presale → License → WGMS** (customer had questions before buying anything)
- **DIY Failure → WGMS** (customer tried themselves, hit errors, agent pivoted to WGMS)
- **Support Request → WGMS** (customer came for help, agent embedded upsell)
- **Presale → License → DIY Failure → WGMS** (full journey across multiple tickets)

The arc determines how you frame the opening line and the email-by-email narrative.

---

## Step 3 — Write the Win Report

Follow the tone rules in `references/tone-guide.md`.

**Key tone principles:**
- Write as the agent speaking to teammates, not as an analyst
- First person: "I", "I observed", "What I did differently"
- Keep it punchy — bullet points under each email, not paragraphs
- The final paragraph is the most important: it captures the decisive move and the lesson
- Celebrate the win but keep it humble and teachable
- End with the standard sign-off line

**Email reply sections:**
- Label each: `1st email`, `2nd email`, `Last attempt email`, etc.
- Under each, 3-5 tight bullet points capturing the strategic intent of that reply
- If a reply was from the customer (not the agent), note it briefly: `Customer [replied/asked/converted]:`
- Focus on STRATEGY and APPROACH — not a transcript recap

**The "what I did differently" section:**
- This is the heart of the report — pull it out explicitly
- Format as nested bullets under the relevant email section
- These are the transferable lessons

---

## Step 4 — Output

Print the report directly to the conversation as plain text, ready to copy-paste into Slack.

Do NOT create a .docx file for this skill. Do NOT add markdown headers (##) — use the plain text format matching the example in `references/output-format.md`.

Also offer: "Want me to also add this to the formal case study training manual?"
(If yes → hand off to the `wgms-case-study` skill)

---

## File References

- `references/output-format.md` — Annotated example with line-by-line guidance
- `references/conversion-patterns.md` — Common conversion arcs and how to frame them
- `references/tone-guide.md` — Voice, tone, and language rules for the win report
