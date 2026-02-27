# Win Report Tone & Voice Guide

## The Voice: Agent Speaking to Teammates

The win report is written AS IF the agent is posting in a Slack channel to share a win with the team.
It is NOT a formal document. It is NOT written by an analyst. It IS written by the person who did the work.

---

## Core Tone Principles

### 1. First Person — Always
Use "I", "I observed", "I think it differently", "What I did different here"
Never: "The agent", "The support team", "One approach was"

### 2. Authentic, Slightly Imperfect English
The example output has phrases like:
- "how I win this ticket" (not "won")
- "I think it differently" (not "I thought differently")
- "you will get benefited" (not "you will benefit")

**Preserve this voice.** Don't over-correct to perfect grammar. It reads as genuine and human.
The goal is authenticity, not polish.

### 3. Punchy Bullets — Not Paragraphs
Each email section uses short noun phrases as bullets, not sentences.
Good: `* Data integrity and maintenance mode approach`
Bad: `* I made sure to mention that we take data integrity seriously and use maintenance mode`

### 4. Story-Driven, Not Report-Driven
The report tells a story with a beginning (first contact), middle (journey), and end (close).
The reader should feel the tension of the conversion, not just read a list of actions.

### 5. Teachable and Generous
The tone is collegial — sharing knowledge to help teammates, not showing off.
The closing line always reinforces this: "I hope you will get benefited from it in other cases too."

---

## Language Patterns to USE

### Opening
- "Let me share my experiments and how I win this ticket..."
- "Here I think it differently and..."
- "Finally converted to the [size] wgms sale."
- "Thanks to @[Name] he/she shared this ticket..."

### Email section intros
- "1st email, Reply Pattern:"
- "2nd email, Reply pattern: Customer" (when describing customer's reply)
- "Last attempt email: [context sentence]. [Here I think it differently and...]"

### Decisive move section
- "What I did different here:"
  - Indented sub-bullets
- "I observed each thing he replied with..."
- "I checked the backup size from his FTP..."
- "The last sentence — [what was said and why it mattered]"

### Closing
- "These are all my approaches and thought process with AI and past experience."
- "Finally converted to the [size] wgms sale."
- "Sharing with you as a case study, I hope you will get benefited from it in other cases too."

---

## Language to AVOID

| Avoid | Use Instead |
|---|---|
| "The agent replied with..." | "1st email, Reply Pattern: *..." |
| "In conclusion..." | Just write the closing paragraph |
| "Leveraged synergies..." | Keep it simple and direct |
| "This case demonstrates..." | Let the bullets show it |
| "The customer was experiencing..." | Brief context sentence, then move on |
| Long paragraphs | Short bullets under each email |
| Markdown headers (##, ###) | Plain labels like "1st email, Reply Pattern:" |
| Perfect grammar corrections | Keep the authentic voice |

---

## Length Guidelines

| Section | Length |
|---|---|
| Header (sale + URL) | 2 lines |
| Opening paragraph | 2-4 sentences |
| Per email section | Label + 3-6 bullets |
| "What I did different" sub-section | 2-4 indented bullets |
| Closing paragraph | 2-3 sentences |
| **Total** | **Fits in a Slack message — ~200-350 words** |

---

## What to Emphasize vs. Skip

### EMPHASIZE
- The moment the customer's mindset shifted
- The specific tactic that was unconventional or clever
- The exact framing of the key email (in bullet form)
- Any collaboration with teammates
- The customer's emotional state / urgency signals

### SKIP
- Technical details (error codes, server paths) — unless they're the KEY insight
- Credential/login info — always strip
- Routine steps that don't teach anything
- Multiple back-and-forth emails that were just information gathering
- Anything that happened after the sale (post-migration is for the case study doc, not this report)

---

## Example Bullet Transformations

### Raw ticket moment:
*"I noticed the customer had shared their FTP file which showed the backup was 3.8GB. Rather than asking for more info, I calculated the tier on the spot and included the $499 quote directly in the same reply as the troubleshooting help."*

### As a win report bullet:
`* I checked the backup size from his FTP file shared and share the quote price directly in this email along with the solution mindset`

### As a "What I did different" bullet:
`   * Skipped the audit step — calculated tier from available FTP data and quoted inline`

---

## The "Last Sentence" Highlight

One of the most powerful moments in any win report is calling out the CLOSING LINE of the decisive email — the sentence that tipped the customer over.

If you can identify it, format it like this:

```
* What I did different here:
   * [Other tactic]
   * [Other tactic]
   * Finally, the last sentence - [paraphrase what was said and why it worked]
```

Example from the canonical output:
```
   * Finally, the last sentence - Standard support can take back and forth communication
     and live site may be affect with this.
```

This is powerful because it shows teammates the exact framing that works.
