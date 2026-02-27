# WGMS Docx Generation — Node.js Patterns

## Setup

```bash
# Verify docx is installed globally
npm list -g docx

# If not installed:
npm install -g docx
```

## Required Imports

```javascript
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, PageBreak, Header, Footer
} = require('docx');
const fs = require('fs');
```

## Page Setup (Always Use This)

```javascript
sections: [{
  properties: {
    page: {
      size: { width: 12240, height: 15840 }, // US Letter
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1-inch margins
    }
  },
  // Content width = 12240 - 2880 = 9360 DXA
  children: [ /* content */ ]
}]
```

## Brand Colors

```javascript
const COLORS = {
  primary: "1F4E79",    // Dark blue — headings, header bar
  accent: "2E75B6",     // Medium blue — subheadings, dividers
  winGreen: "28A745",   // Green — sales lessons, WIN callouts
  warnYellow: "FFC107", // Yellow — crisis/warning callouts
  infoBlue: "2E75B6",   // Blue — info callouts
  bgBlueLight: "EBF3FB", // Light blue — table row alternating
  bgGreenLight: "E8F8EC",// Light green — sales lesson boxes
  bgYellow: "FFF3CD",   // Light yellow — warning boxes
  bgBlue: "E8F4FD",     // Light blue — info boxes
  headerText: "FFFFFF", // Table header text
  bodyText: "333333",   // Body text in callouts
  mutedText: "555555",  // Muted text (footer, subtitle)
};
```

## Document Styles

```javascript
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{ /* ... */ }]
});
```

## Helper Functions (Copy These Into Every Generation Script)

```javascript
// Heading 1
function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, bold: true, size: 32, color: "1F4E79", font: "Arial" })]
  });
}

// Heading 2
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 26, color: "2E75B6", font: "Arial" })]
  });
}

// Heading 3 (no docx heading level — styled paragraph)
function heading3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: "2E75B6", font: "Arial" })]
  });
}

// Body paragraph
function body(text, options = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...options })]
  });
}

// Spacer
function spacer() {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text: "", size: 22 })]
  });
}

// Bullet
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

// Horizontal divider line
function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "2E75B6", space: 1 } },
    spacing: { before: 160, after: 160 },
    children: [new TextRun({ text: "" })]
  });
}

// Standard data table
function makeTable(headers, rows, colWidths) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const hBorder = { style: BorderStyle.SINGLE, size: 1, color: "1F4E79" };
  const hBorders = { top: hBorder, bottom: hBorder, left: hBorder, right: hBorder };
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          borders: hBorders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: "1F4E79", type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          children: [new Paragraph({
            children: [new TextRun({ text: h, bold: true, size: 20, color: "FFFFFF", font: "Arial" })]
          })]
        }))
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, ci) => new TableCell({
          borders,
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: ri % 2 === 0 ? "EBF3FB" : "FFFFFF", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 150, right: 150 },
          children: [new Paragraph({
            children: [new TextRun({ text: String(cell), size: 20, font: "Arial" })]
          })]
        }))
      }))
    ]
  });
}

// Colored callout box
// fillColor: "FFF3CD" (warn), "E8F8EC" (win), "E8F4FD" (info)
// borderColor: "FFC107" (warn), "28A745" (win), "2E75B6" (info)
function calloutBox(label, text, fillColor, borderColor) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
          left: { style: BorderStyle.THICK, size: 12, color: borderColor },
          right: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
        },
        shading: { fill: fillColor, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        width: { size: 9360, type: WidthType.DXA },
        children: [
          new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 22, font: "Arial" })] }),
          new Paragraph({
            spacing: { before: 60 },
            children: [new TextRun({ text, size: 21, font: "Arial" })]
          })
        ]
      })]
    })]
  });
}

// Shorthand callout types
const salesLesson = (label, text) => calloutBox(label, text, "E8F8EC", "28A745");
const warningBox  = (label, text) => calloutBox(label, text, "FFF3CD", "FFC107");
const infoBox     = (label, text) => calloutBox(label, text, "E8F4FD", "2E75B6");
```

## Header & Footer

```javascript
headers: {
  default: new Header({
    children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F4E79", space: 1 } },
      children: [new TextRun({
        text: "WGMS Success & Sales Conversion Training Manual  |  Duplicator Support Team",
        size: 18, font: "Arial", color: "555555"
      })]
    })]
  })
},
footers: {
  default: new Footer({
    children: [new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79", space: 1 } },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: "Page ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: "555555" }),
        new TextRun({ text: " of ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: "Arial", color: "555555" })
      ]
    })]
  })
}
```

## Saving & Validating

```javascript
// Save
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/output.docx', buffer);
  console.log('Done');
});
```

```bash
# Validate (run after generation)
python3 /mnt/skills/public/docx/scripts/office/validate.py /home/claude/output.docx
```

## Critical Rules

- **Never use `\n`** inside TextRun — use separate Paragraph elements
- **Never use unicode bullets** (`•`) manually — always use numbering config
- **Always use `WidthType.DXA`** — never percentage widths (breaks in Google Docs)
- **Tables need dual widths**: `columnWidths` array AND `width` on each cell
- **Always use `ShadingType.CLEAR`** — never `SOLID` (causes black backgrounds)
- **PageBreak must be inside a Paragraph** — never standalone
