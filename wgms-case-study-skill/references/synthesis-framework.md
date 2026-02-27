# WGMS Consolidated Training Report — Synthesis Framework

## Purpose

When the user provides 2 or more completed case study .docx files, this framework guides extraction of cross-case patterns to produce a master training report.

---

## Step 1: Extract Text from Each Case Study

```bash
# For each .docx file provided:
pandoc /path/to/case_study.docx -t plain -o /tmp/case_XX.txt

# Or read all at once:
for f in /mnt/user-data/uploads/*.docx; do
  echo "=== $f ===" >> /tmp/all_cases.txt
  pandoc "$f" -t plain >> /tmp/all_cases.txt
done
```

---

## Step 2: Build a Case Index

Before analysis, create a structured index of all cases:

| Case # | Customer | Site Type | Source Host | Dest Host | Backup Size | Tier | Outcome |
|---|---|---|---|---|---|---|---|
| 01 | ... | ... | ... | ... | ... | ... | ... |

---

## Step 3: Cross-Case Pattern Extraction

### 3A — Technical Error Patterns

Group all errors across cases by type. For each group:
- How many cases had this error?
- What hosts was it associated with?
- What was the resolution in each instance?
- Is there now a standard playbook for it?

**Output:** "Technical Pattern Catalog" table in the report

### 3B — Sales Conversion Patterns

Identify which sales strategies appeared across multiple cases:
- Which pivot types converted most reliably?
- Which objections recurred?
- Which phrases were used in successful closes?
- What discount was offered and at what stage?

**Output:** "Sales Playbook" section with ranked strategies

### 3C — Host-Specific Gotchas

Group findings by hosting provider:
- What unique constraints did each host present?
- What workarounds were used?
- Should any host trigger a proactive warning to the customer?

**Output:** "Host Compatibility Matrix" — one row per host with known issues and standard resolution

### 3D — Crisis Catalog

List every crisis encountered across all cases:
- How was it detected?
- What was the immediate response?
- What was said to the customer?
- Was the customer shielded or did they experience the problem?
- What would the team do differently?

**Output:** "Crisis Response Catalog" — categorized, actionable

### 3E — Win Rate Analysis

Across all cases, tally:
- Overall success rate
- Time-to-completion average vs. quoted timeframe
- Discount usage rate
- Review request completion rate
- Cases where crisis occurred but outcome was still WIN

**Output:** "Performance Metrics" summary (narrative, not just numbers)

### 3F — Failure Mode Analysis

Identify any cases or moments rated as LESSON LEARNED:
- What went wrong?
- What was the root cause (process gap, communication gap, technical gap)?
- What process change would prevent recurrence?

**Output:** "Failure Mode Catalog" with recommended process improvements

---

## Step 4: Derive "What Would You Do?" Scenarios

From the cross-case analysis, select the 5-8 most instructive scenarios for team training. Criteria:
- The situation is likely to recur
- The correct response is non-obvious
- A wrong response would significantly harm customer trust or lose the sale

For each scenario:
1. Write the situation as a realistic 2-4 sentence paragraph (no customer names)
2. Write the recommended approach
3. Write the key principle it illustrates

---

## Step 5: Saved Reply Audit

Based on the cases, evaluate the current saved reply set:
- Which saved replies were used effectively?
- Were there moments where no saved reply existed but one should?
- Are there any saved replies that needed heavy customization every time?

**Output:** "Saved Reply Recommendations" — a table of suggested additions or modifications

---

## Report Sections (in order)

1. Executive Summary (1 page)
2. Case Index Table
3. Technical Pattern Catalog
4. Host Compatibility Matrix
5. Sales Conversion Playbook
6. Crisis Response Catalog
7. Performance Metrics
8. Failure Mode Analysis & Process Improvements
9. Team Training Scenarios ("What Would You Do?")
10. Saved Reply Recommendations
11. Appendix: Per-Case Summary Cards

---

## Tone & Style for Consolidated Report

- Write for a support team member reading this before their first ticket
- Be direct and prescriptive — say "Do X" not "Consider doing X"
- Use real failure examples but anonymize beyond customer type (e.g., "eCommerce customer on Hostinger")
- Frame every failure as a learning, not a criticism
- Keep the executive summary non-technical — it may be read by team leads
