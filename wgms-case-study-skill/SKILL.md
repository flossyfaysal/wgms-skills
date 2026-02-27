---
name: wgms-case-study
description: >
  Use this skill whenever you need to analyze a Duplicator White Glove Migration Service (WGMS)
  support ticket and produce a professional training case study document (.docx), OR when you
  need to synthesize multiple completed case study documents into a consolidated training report
  covering common patterns, sales scenarios, technical failures, and team learnings.

  Trigger this skill when the user:
  - Pastes or uploads a raw WGMS support ticket thread and wants a case study
  - Says "analyze this ticket", "create a case study", "add this to the training manual"
  - Wants to generate a case study from ticket data (single or multiple tickets)
  - Has multiple case study .docx files and wants a consolidated training report, master playbook,
    failure analysis, or "what did we learn" document across all cases
  - Uses phrases like "synthesize all cases", "training report from all case studies",
    "common patterns", "master training doc", or "combine case studies"

  Always use this skill — do not attempt WGMS case study generation from scratch without it.
---

# WGMS Case Study Skill

This skill produces two types of professional .docx outputs for the Duplicator Support Team:

1. **Single Case Study** — Analyzes one ticket thread → outputs a structured training module
2. **Consolidated Training Report** — Synthesizes multiple case study .docx files → outputs a master playbook

---

## Quick Decision: Which Mode?

| User Input | Mode |
|---|---|
| Raw ticket thread / pasted conversation | → Single Case Study |
| Uploaded .docx case study files (2+) | → Consolidated Report |
| Both ticket + existing case studies | → Single Case Study first, then offer to consolidate |

---

## MODE 1: Single Case Study

### Step 1 — Extract Data from the Ticket

Before writing anything, parse the raw ticket thread and extract:

```
REQUIRED FIELDS:
- Customer name & company
- Site type (eCommerce/WooCommerce/standard/multisite)
- Source host → Destination host
- Backup size (MB/GB)
- Service tier ($149 / $299 / $499)
- Discount applied (if any, e.g. WGMS30)
- Ticket reference numbers
- Final outcome (completed / failed / pending)

STRIP ALL OF THESE — never include in output:
- Passwords (any field containing password/pass/pwd)
- Usernames / login emails
- Raw credential blocks
- Secret links (secrets.supportally.com URLs)
- OTP codes
- cPanel / FTP / hosting account credentials
- Any URL that contains login tokens
```

If any required field is missing from the ticket, note it as "Not specified" — do not invent data.

### Step 2 — Analyze Across 5 Pillars

Read `references/analysis-framework.md` for the detailed analysis framework.

Run the analysis mentally across:
1. **Technical Challenge** — root cause, error type, hosting constraint
2. **Sales Pivot** — conversion moment, phrase used, objection handled
3. **Execution & Delivery** — post-sale migration steps, blockers, solutions
4. **Crisis Management** — unexpected problems and how they were resolved
5. **Win/Loss Assessment** — what worked, what to learn

### Step 3 — Generate the .docx

Read `references/docx-generation.md` for the complete Node.js generation script pattern.

Use the document structure defined in `assets/templates/case-study-template.md`.

**Naming convention:** `WGMS_Training_Case[NN]_[CustomerLastName].docx`
Example: `WGMS_Training_Case02_Smith.docx`

Increment the case number based on any existing case studies the user has mentioned. Default to `01` if unknown.

### Step 4 — Output

Save to `/mnt/user-data/outputs/` and present with `present_files`.

---

## MODE 2: Consolidated Training Report

When the user provides multiple completed case study .docx files, synthesize them into a master report.

### Step 1 — Read All Case Studies

Use `pandoc` or the bash tool to extract text from each .docx:
```bash
pandoc input.docx -t plain
```

### Step 2 — Cross-Case Analysis

Read `references/synthesis-framework.md` for the full synthesis methodology.

Extract across ALL cases:
- Common technical error patterns (group by type)
- Sales conversion patterns (what phrases/strategies recur)
- Objection types and how they were handled
- Crisis types and resolution strategies
- Host-specific gotchas (Hostinger, WPEngine, GoDaddy, etc.)
- Win rate by category
- Recurring failure modes

### Step 3 — Generate Consolidated Report

Use the structure in `assets/templates/consolidated-report-template.md`.

**Output naming:** `WGMS_Master_Training_Report_[YYYY-MM].docx`

The report includes:
- Executive summary
- Pattern analysis (technical + sales)
- Host-specific playbooks
- Failure mode catalog
- Team "What Would You Do?" scenarios (pulled from real cases)
- Recommended saved reply improvements
- Appendix: case index

---

## Critical Rules

- **NEVER include credentials, passwords, or login info** — strip everything
- Always use the docx skill generation pattern (Node.js + docx npm package)
- Use US Letter page size (12240 × 15840 DXA), 1-inch margins
- Color palette: Primary `#1F4E79`, Accent `#2E75B6`, Callouts use colored borders
- Validate the .docx after generation
- Case numbers are zero-padded two digits: `01`, `02`, `03`...
- All tables use `WidthType.DXA` — never percentage widths

## File References

- `references/analysis-framework.md` — The 5-pillar analysis methodology
- `references/synthesis-framework.md` — Cross-case synthesis methodology  
- `references/docx-generation.md` — Node.js docx generation patterns, styles, color palette
- `assets/templates/case-study-template.md` — Section-by-section document blueprint
- `assets/templates/consolidated-report-template.md` — Master report blueprint
- `scripts/generate_case_study.js` — Starter script (customize per case)
