# Consolidated Training Report Template

## Document Title

```
WGMS Master Training Report
Duplicator Support Team — Internal Use Only
Synthesized from [N] Case Studies | [Month Year]
```

---

## Section Order

### Section 1: Executive Summary (1 page max)

Non-technical overview for team leads. Cover:
- How many cases were analyzed
- Overall win rate
- Top 3 recurring technical challenges
- Top 3 most effective sales strategies
- Most common crisis type and how the team handled it
- Key recommendation for process improvement

---

### Section 2: Case Index

**Table** (7+ columns):

| Case # | Customer Type | Site Type | Source Host | Dest Host | Backup Size | Tier | Outcome |
|---|---|---|---|---|---|---|---|

Note: Use customer TYPE not name (e.g., "eCommerce / WooCommerce") for privacy.

---

### Section 3: Technical Pattern Catalog

**For each error pattern identified:**

Sub-heading: `Pattern: [Error Type Name]`

- **Frequency:** Appeared in X of Y cases
- **Associated Hosts:** [list]
- **Trigger Conditions:** [what causes it]
- **Standard Resolution:** [what to do]
- **Escalation Threshold:** [when to escalate vs. self-resolve]

Follow with a summary table:

| Error Type | Cases | Hosts | Resolution |
|---|---|---|---|

---

### Section 4: Host Compatibility Matrix

**Table** (per host):

| Host | Known Issues | Standard Workaround | Risk Level |
|---|---|---|---|
| Hostinger | Path conflicts, 2FA layers, dual-root on partial propagation | Provision fresh environment | Medium |
| WPEngine | Import blocked | SFTP direct transfer | High |
| GoDaddy Managed | Limited cPanel access | Staging workaround | High |
| HostGator | Generally compatible | Standard flow | Low |
| WordPress.com | Partial export only | Different workflow required | Very High |

---

### Section 5: Sales Conversion Playbook

**Ranked by effectiveness (most reliable → situational):**

#### Strategy 1: The Embedded Upsell
- **When:** Customer is stuck mid-DIY
- **Approach:** Answer technical question fully, then add WGMS link at bottom
- **Key Phrase:** "If you'd prefer our paid hands-off migration, our experts can handle everything for you in 24-72 hours."
- **Success Rate:** [X/Y cases where this was used]

#### Strategy 2: The Objection-to-Discount Close
[Same format]

#### Strategy 3: The Urgency Mirror
[Same format]

[Continue for all identified strategies]

**Objection Handling Quick Reference Table:**

| Objection | Response Strategy | Discount? | Key Phrase |
|---|---|---|---|
| "I already paid for Duplicator Pro" | Reframe + Bridge | Yes (WGMS30) | "Duplicator Pro is required by our team..." |
| "Is this really necessary?" | Risk mitigation | Optional | "For an eCommerce site, downtime costs..." |
| "Can you guarantee no data loss?" | Process explanation | No | "Our pre-migration backup and audit process..." |

---

### Section 6: Crisis Response Catalog

**For each crisis type identified across cases:**

Sub-heading: `Crisis Type: [Name]`

- **Trigger:** What causes this
- **Frequency:** How often it appeared
- **Immediate Action:** What to do first (before contacting customer)
- **Customer Communication:** What to say (template phrase)
- **Resolution Path:** Step-by-step
- **Common Mistake:** What NOT to do

---

### Section 7: Performance Metrics

Narrative summary of team performance across all cases:

- **Overall success rate:** X%
- **Average time to completion:** X days (vs. quoted Y days)
- **Discount usage rate:** X% of cases
- **Review request completion:** X% of completed cases
- **Cases with crises that still succeeded:** X/Y

Note: Keep this narrative and honest — frame shortfalls as improvement opportunities.

---

### Section 8: Failure Mode Analysis & Process Improvements

**For each identified failure mode:**

| Failure Mode | Root Cause | Process Gap | Recommended Fix |
|---|---|---|---|
| [What went wrong] | [Why] | [What process was missing] | [Specific action to take] |

Follow with prioritized recommendations:
1. **High Priority:** [Fix needed immediately]
2. **Medium Priority:** [Fix in next sprint]
3. **Low Priority:** [Nice to have]

---

### Section 9: Team Training Scenarios ("What Would You Do?")

5-8 scenarios pulled from real cases (anonymized). Same format as single case study:
- Italicized situation
- Blue callout with recommended approach
- Key principle stated explicitly

---

### Section 10: Saved Reply Recommendations

**Table:**

| Status | Saved Reply | Recommendation |
|---|---|---|
| EXISTS — KEEP | [WGMS] - Sale Approach - Variation for Errors | No change needed |
| EXISTS — MODIFY | [WGMS] - Final Quote and Migration Confirmation | Add host-specific note for Hostinger cases |
| NEW — CREATE | [WGMS] - Hostinger Fresh Environment Explanation | New reply for path conflict resolution explanation |

---

### Appendix: Per-Case Summary Cards

One card per case (compact format):

```
CASE #[NN] | [Customer Type] | [Source] → [Dest]
Technical: [One-line summary of main challenge]
Sales: [One-line summary of conversion strategy]
Outcome: [WIN / LESSON / PENDING]
Key Takeaway: [One sentence]
```
