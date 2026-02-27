/**
 * WGMS Case Study Generator — Starter Script
 *
 * Usage:
 *   1. Fill in the CASE_DATA object below with data extracted from the ticket
 *   2. Fill in the SECTIONS object with analyzed content
 *   3. Run: node generate_case_study.js
 *   4. Validate: python3 /mnt/skills/public/docx/scripts/office/validate.py /home/claude/WGMS_Training_Case[NN]_[Name].docx
 *
 * Output: /home/claude/WGMS_Training_Case[NN]_[Name].docx
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, PageBreak, Header, Footer
} = require('docx');
const fs = require('fs');

// ============================================================
// STEP 1: Fill in case data (strip ALL credentials/passwords)
// ============================================================
const CASE_DATA = {
  caseNumber: "01",             // Zero-padded: "01", "02", etc.
  customerLastName: "Roling",   // Used in filename
  caseTitle: "The Frustrated DIY Customer",
  caseSubtitle: "Medical Aesthetic Supply  |  HostGator → Hostinger  |  Outcome: Closed Sale + Successful Migration",
  author: "Sk Faysal",
  snapshot: [
    ["Customer", "Dianne Roling — Medical Aesthetic Supply"],
    ["Site Type", "eCommerce / WooCommerce"],
    ["Source Host", "HostGator"],
    ["Destination Host", "Hostinger"],
    ["Backup Size", "779 MB compressed"],
    ["Service Tier", "$299 — Larger Sites with Extensive Data"],
    ["Discount Applied", "30% via WGMS30"],
    ["Final Outcome", "Migration Completed — Customer Satisfied — Review Requested"],
    ["Ticket Reference", "Ticket #16002 / #15897"]
  ]
};

// ============================================================
// STEP 2: Fill in analyzed content per section
// ============================================================
const SECTIONS = {
  technicalIntro: "This case involved two interrelated technical problems that played out across two separate tickets.",

  technicalEvents: [
    {
      ticketRef: "Ticket #15897 — The Initial DIY Failure",
      intro: "Dianne attempted to restore her own backup on Hostinger. The error she encountered was:",
      errorBox: {
        label: "Error Encountered by Customer:",
        text: 'Archive path "/home/[user]/domains/lightsteelblue-lemur.hostingersite.com/public_html/wp-content/backups-dup-pro/imports/[archive].zip" is invalid'
      },
      rootCause: [
        "The backup was uploaded via the Duplicator import tool, but Hostinger's server path structure did not match Duplicator's expected path.",
        "This is a common Hostinger-specific constraint: the environment uses non-standard directory mapping causing path validation errors during Step 1 (Upload Backup) and Step 2 (Confirmation/Launch Installer).",
        "The customer was a new Duplicator Pro purchaser — technically inexperienced with manual installer flows."
      ],
      resolution: null // Resolved in next ticket
    },
    {
      ticketRef: "Ticket #16002 — The Post-Sale Server Configuration Problem",
      intro: "After the customer purchased WGMS, a second technical challenge emerged during the actual migration attempt:",
      errorBox: {
        label: "Root Cause — Parameter Validation Error:",
        text: "The first destination server was partially connected to the domain but domain propagation was incomplete. Hostinger returned two conflicting root directory paths. Duplicator could not safely proceed because the installation path was ambiguous."
      },
      rootCause: null,
      resolution: [
        "A fresh, clean Hostinger environment was provisioned — free of domain propagation conflicts.",
        "The migration was completed on this clean server.",
        "Post-migration, the customer was guided to detach the old setup and point the domain to the new installation."
      ]
    }
  ],

  salesIntro: "This case is a textbook example of converting a frustrated self-serve customer into a WGMS sale. There were two distinct pivot moments.",

  pivots: [
    {
      title: "Pivot #1 — Ticket #15897: Turning a Support Request into a Migration Lead",
      table: [
        ["Customer State", "Confused, hitting installer errors — clearly overwhelmed."],
        ["Support Action", "Agent diagnosed the path error, provided the knowledge base fix, AND added the WGMS upsell link at the bottom of the troubleshooting reply."],
        ["Key Phrase Used", '"If you\'d prefer our paid hands-off migration, our experts can handle everything for you in 24-72 hours."'],
        ["Why It Worked", "The offer was non-pushy, placed after a genuinely helpful answer, and directly solved the customer's core pain: time and technical complexity."]
      ],
      lesson: {
        label: "Sales Lesson #1 — The Embedded Upsell:",
        text: "Always answer the technical question FIRST. Then, and only then, offer WGMS as a frictionless alternative. Customers who are already stuck are primed to say yes to a done-for-you solution."
      }
    },
    {
      title: "Pivot #2 — Ticket #16002: Handling the Objection and Closing with a Discount",
      intro: "Before purchasing WGMS, the customer raised an objection: she felt her $49.50 Duplicator Pro purchase was wasted because Hostinger told her the tool wasn't necessary. This was a critical trust moment.",
      table: [
        ["1. Acknowledge", "Validated the frustration without being defensive about Hostinger's bad advice.", "Builds trust immediately."],
        ["2. Reframe", "Clarified that Duplicator Pro is required by OUR team for WGMS — not for DIY use.", "Removes the objection logically."],
        ["3. Bridge", "Offered 30% discount (WGMS30) to make the customer feel the Pro purchase wasn't a total loss.", "Financial empathy closes hesitation."],
        ["4. Urgency", "Used language that aligned with the customer's stated urgency ('time is of the essence').", "Customer's own words used against stalling."],
        ["5. Close", "Sent direct purchase link in the same message as the discount offer.", "Removes all friction from the purchase path."]
      ],
      pivotTableCols: 3, // 3-col pivot
      lesson: {
        label: "Sales Lesson #2 — The Objection-to-Discount Close:",
        text: "When a customer feels they've already wasted money, a targeted discount doesn't just reduce the price — it restores their sense of fairness. The WGMS30 code is your most powerful tool when a customer is 80% sold but emotionally hesitant."
      }
    }
  ],

  executionIntro: "After the sale was confirmed, the team encountered the path conflict issue. This is where technical adaptability was essential.",
  executionTable: [
    ["Credentials Received", "Customer shared source and destination site access.", "2FA was active — customer asked to disable it first."],
    ["2FA Issue", "OTP code was required even after customer said 2FA was disabled.", "Team pivoted: proceeded using the pre-supplied backup archive."],
    ["Destination Problem", "Parameter validation error on original Hostinger server.", "Provisioned a fresh clean Hostinger environment."],
    ["Migration Executed", "Site migrated from source backup to new destination environment.", "Full post-migration audit completed."],
    ["Customer Handoff", "Visual guide sent for DNS/domain re-pointing.", "Clear, non-technical language used."],
    ["Follow-Up", "Review request sent 48-72 hours post-completion.", "Trustpilot link + cloud storage recommendation included."]
  ],

  crisisIntro: "This case had two mini-crises that could have derailed the migration. Here is how they were handled:",
  crises: [
    {
      label: "Crisis #1 — 2FA Blocking Access:",
      text: "Customer said 2FA was disabled, but the OTP prompt still appeared. Resolution: Team did not stall or keep asking. They pivoted immediately — \"We'll proceed using the backup you provided.\" This kept momentum without creating customer anxiety."
    },
    {
      label: "Crisis #2 — Destination Server Path Conflict:",
      text: "Rather than sending a confusing technical explanation, the team resolved the server issue themselves (provisioning a clean environment) and sent a clear explanation AFTER the fact. The customer never experienced the problem — they only received the solution."
    }
  ],
  corePrinciple: "Shield the customer from complexity. Solve first, explain simply, deliver confidently.",

  metricsTable: [
    ["Technical Diagnosis", "Path conflict correctly identified on both tickets.", "WIN"],
    ["Sales Pivot (Ticket #15897)", "WGMS link embedded after technical answer.", "WIN"],
    ["Objection Handling", "Pro purchase concern addressed with discount bridge.", "WIN"],
    ["2FA Blocker", "Pivoted to backup-based migration without customer delay.", "WIN"],
    ["Server Conflict", "Provisioned fresh environment; customer shielded from complexity.", "WIN"],
    ["Communication Clarity", "Technical issue explained post-migration with visual aid.", "WIN"],
    ["Post-Migration Follow-Up", "Review requested within 48-72 hours.", "WIN"],
    ["Urgency Matching", "Team matched pace to customer's stated urgency.", "WIN — Lesson: always acknowledge and mirror urgency signals."]
  ],

  takeaways: [
    "When a customer hits installer errors on Hostinger — think path conflict FIRST. Provision a fresh server before wasting time debugging the existing one.",
    "Always embed the WGMS upsell at the bottom of complex troubleshooting replies. Not as a push — as a service.",
    "Use WGMS30 when a customer hesitates due to prior money spent. It bridges the gap emotionally and financially.",
    "If 2FA blocks access, pivot to the backup file immediately. Never make the customer feel the migration is stalling because of their environment.",
    "After any complex migration with server issues, write a simple post-completion explanation. It builds enormous trust and reduces 'Day 2' support requests.",
    "Request a review 48-72 hours after completion while the positive experience is still fresh."
  ],

  scenarios: [
    {
      letter: "A",
      situation: "A customer contacts you after purchasing WGMS. They say their source site requires an OTP code and they cannot figure out how to disable 2FA. Meanwhile, you have a valid backup link. What do you do?",
      approach: "Do not wait. Proceed with the backup file for migration. Inform the customer: 'No problem — we'll proceed using the backup you provided and keep you updated.' Speed and confidence are what the customer needs, not more back-and-forth."
    },
    {
      letter: "B",
      situation: "A new customer tells you they already spent $49.50 on Duplicator Pro and it didn't work. They're skeptical about spending $299 more on WGMS. How do you close?",
      approach: "Validate their frustration. Clarify that Duplicator Pro is required by your team for WGMS (not a duplicate expense). Offer the WGMS30 discount. Send the purchase link in the same message. Frame it as the team taking over so they never have to deal with this again."
    },
    {
      letter: "C",
      situation: "During migration, the destination server returns a parameter validation error. You cannot proceed on the provisioned environment. The customer is waiting. What do you do?",
      approach: "Provision a fresh, clean hosting environment. Do not surface the technical issue to the customer until you have a solution in hand. Complete the migration, then send a clear explanation with a visual guide. Customers pay for outcomes, not for real-time debugging updates."
    }
  ],

  appendixReplies: [
    ["[WGMS] - Sale Approach - Variation for Errors", "When customer hits installer/path errors in DIY migration."],
    ["[WGMS] - Final Quote and Migration Confirmation", "After auditing backup — send quote with pricing and purchase link."],
    ["[WGMS] - Migration Service Purchase Confirmed – Next Steps", "Immediately after purchase confirmed in Help Scout EDD widget."],
    ["[WGMS] - Migration Completed – Final Confirmation & Next Steps", "After post-migration audit passes all checklist items."],
    ["[WGMS] - Review request after a successful migration", "Send 48-72 hours after completion."],
    ["Discount Code: WGMS30", "Use when customer hesitates due to prior spend or requests a discount."]
  ]
};

// ============================================================
// HELPERS
// ============================================================
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const hBorder = { style: BorderStyle.SINGLE, size: 1, color: "1F4E79" };
const hBorders = { top: hBorder, bottom: hBorder, left: hBorder, right: hBorder };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, bold: true, size: 32, color: "1F4E79", font: "Arial" })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 26, color: "2E75B6", font: "Arial" })] });
}
function h3(text) {
  return new Paragraph({ spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: "2E75B6", font: "Arial" })] });
}
function body(text, opts = {}) {
  return new Paragraph({ spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })] });
}
function sp() {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "", size: 22 })] });
}
function bul(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })] });
}
function div() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "2E75B6", space: 1 } },
    spacing: { before: 160, after: 160 }, children: [new TextRun({ text: "" })]
  });
}
function tbl(headers, rows, colWidths) {
  const total = colWidths.reduce((a,b) => a+b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: colWidths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => new TableCell({
        borders: hBorders, width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: "1F4E79", type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 150, right: 150 },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: "FFFFFF", font: "Arial" })] })]
      })) }),
      ...rows.map((row, ri) => new TableRow({ children: row.map((cell, ci) => new TableCell({
        borders, width: { size: colWidths[ci], type: WidthType.DXA },
        shading: { fill: ri % 2 === 0 ? "EBF3FB" : "FFFFFF", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 150, right: 150 },
        children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 20, font: "Arial" })] })]
      })) }))
    ]
  });
}
function callout(label, text, fill, bColor) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 4, color: bColor },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: bColor },
        left: { style: BorderStyle.THICK, size: 12, color: bColor },
        right: { style: BorderStyle.SINGLE, size: 4, color: bColor } },
      shading: { fill, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 180, right: 180 },
      width: { size: 9360, type: WidthType.DXA },
      children: [
        new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 22, font: "Arial" })] }),
        new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text, size: 21, font: "Arial" })] })
      ]
    })] })]
  });
}
const lesson = (l, t) => callout(l, t, "E8F8EC", "28A745");
const warn   = (l, t) => callout(l, t, "FFF3CD", "FFC107");
const info   = (l, t) => callout(l, t, "E8F4FD", "2E75B6");

// ============================================================
// BUILD DOCUMENT
// ============================================================
const children = [];

// Cover
children.push(sp(), sp());
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 480, after: 120 },
  children: [new TextRun({ text: "WGMS Success & Sales Conversion", bold: true, size: 56, font: "Arial", color: "1F4E79" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 },
  children: [new TextRun({ text: "Training Manual", bold: true, size: 48, font: "Arial", color: "2E75B6" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER,
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6", space: 6 } },
  spacing: { before: 0, after: 360 },
  children: [new TextRun({ text: "Duplicator Support Team  —  Internal Use Only", size: 22, font: "Arial", color: "888888" })] }));
children.push(sp());
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 80 },
  children: [new TextRun({ text: `Version 1.0  |  By ${CASE_DATA.author}`, size: 20, font: "Arial", color: "555555" })] }));
children.push(sp(), sp(), div());

// Case Study Header
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1(`Case Study #${CASE_DATA.caseNumber}: ${CASE_DATA.caseTitle}`));
children.push(new Paragraph({ spacing: { before: 60, after: 200 },
  children: [new TextRun({ text: CASE_DATA.caseSubtitle, size: 20, font: "Arial", color: "555555", italics: true })] }));

// Section 2: Snapshot
children.push(h2("1. Case Snapshot"), sp());
children.push(tbl(["Field", "Details"], CASE_DATA.snapshot, [2800, 6560]));
children.push(sp());

// Section 3: Technical
children.push(h2("2. The Technical Challenge"));
children.push(body(SECTIONS.technicalIntro));
children.push(sp());
for (const evt of SECTIONS.technicalEvents) {
  children.push(h3(evt.ticketRef));
  children.push(body(evt.intro));
  children.push(sp());
  children.push(warn(evt.errorBox.label, evt.errorBox.text));
  children.push(sp());
  if (evt.rootCause) {
    children.push(body("Root Cause Analysis:", { bold: true }));
    for (const rc of evt.rootCause) children.push(bul(rc));
    children.push(sp());
  }
  if (evt.resolution) {
    children.push(body("Resolution:", { bold: true }));
    for (const r of evt.resolution) children.push(bul(r));
    children.push(sp());
  }
}

// Section 4: Sales Pivot
children.push(h2("3. The Sales Pivot — How the Conversion Happened"));
children.push(body(SECTIONS.salesIntro));
children.push(sp());
for (const pivot of SECTIONS.pivots) {
  children.push(h3(pivot.title));
  if (pivot.intro) { children.push(body(pivot.intro)); children.push(sp()); }
  if (pivot.pivotTableCols === 3) {
    children.push(tbl(["Step", "Agent Action", "Why It Worked"], pivot.table, [1200, 4500, 3660]));
  } else {
    children.push(tbl(["Element", "What Was Done"], pivot.table, [2400, 6960]));
  }
  children.push(sp());
  children.push(lesson(pivot.lesson.label, pivot.lesson.text));
  children.push(sp());
}

// Section 5: Execution
children.push(h2("4. Execution & Post-Sale Technical Delivery"));
children.push(body(SECTIONS.executionIntro));
children.push(sp());
children.push(tbl(["Migration Step", "Action Taken", "Notes"], SECTIONS.executionTable, [2200, 4400, 2760]));
children.push(sp());

// Section 6: Crisis
children.push(h2("5. Crisis Management"));
children.push(body(SECTIONS.crisisIntro));
children.push(sp());
for (const c of SECTIONS.crises) {
  children.push(warn(c.label, c.text));
  children.push(sp());
}
children.push(body("Core Principle:", { bold: true }));
children.push(body(SECTIONS.corePrinciple));
children.push(sp());

// Section 7: Metrics
children.push(h2("6. Success vs. Failure Metrics"));
children.push(sp());
children.push(tbl(["Category", "Result", "Assessment"], SECTIONS.metricsTable, [2800, 4200, 2360]));
children.push(sp());

// Section 8: Takeaways
children.push(h2("7. Actionable Takeaways for the Team"));
children.push(sp());
for (const t of SECTIONS.takeaways) children.push(bul(t));
children.push(sp());
children.push(div());

// Section 9: Scenarios
children.push(h1("Team Assessment: What Would You Do?"));
children.push(body("Use these scenarios in team training sessions. Discuss as a group before revealing the recommended approach."));
children.push(sp());
for (const s of SECTIONS.scenarios) {
  children.push(h2(`Scenario ${s.letter}`));
  children.push(new Paragraph({ spacing: { before: 80, after: 80 },
    children: [new TextRun({ text: s.situation, size: 22, font: "Arial", italics: true })] }));
  children.push(sp());
  children.push(info("Recommended Approach:", s.approach));
  children.push(sp());
}
children.push(div());

// Section 10: Appendix
children.push(h1("Appendix: Key Saved Replies Referenced in This Case"));
children.push(sp());
children.push(tbl(["Saved Reply Name", "When to Use"], SECTIONS.appendixReplies, [3800, 5560]));
children.push(sp());
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 480, after: 80 },
  children: [new TextRun({ text: `— End of Case Study #${CASE_DATA.caseNumber} —`, size: 20, font: "Arial", color: "888888", italics: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 },
  children: [new TextRun({ text: "Additional cases will be added as new tickets are analyzed.", size: 18, font: "Arial", color: "AAAAAA", italics: true })] }));

// ============================================================
// ASSEMBLE & SAVE
// ============================================================
const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F4E79", space: 1 } },
      children: [new TextRun({ text: "WGMS Success & Sales Conversion Training Manual  |  Duplicator Support Team", size: 18, font: "Arial", color: "555555" })]
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79", space: 1 } },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: "Page ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: "555555" }),
        new TextRun({ text: " of ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: "Arial", color: "555555" })
      ]
    })] }) },
    children
  }]
});

const outputPath = `/home/claude/WGMS_Training_Case${CASE_DATA.caseNumber}_${CASE_DATA.customerLastName}.docx`;
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Generated: ${outputPath}`);
});
