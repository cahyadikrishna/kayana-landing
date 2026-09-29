#!/usr/bin/env node
// Guards the Kayana design system (see DESIGN.md). The @theme wipe in
// globals.css already stops off-system utilities from generating; this
// catches arbitrary values and legacy classes that would slip through.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIR = join(ROOT, "src");
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];

const RULES = [
  { pattern: /\[#[0-9a-fA-F]{3,8}\]/, message: "Arbitrary hex color — use paper/ink/graphite/smoke/ash tokens" },
  { pattern: /\brounded-(?!pill\b|none\b)[\w-[\]]+/, message: "Radius other than rounded-pill — everything is 0 except pills" },
  { pattern: /\brounded\b(?!-)/, message: "Bare `rounded` — everything is 0 except pills" },
  { pattern: /\b(?:drop-)?shadow-(?!none\b)[\w-[\]/]+/, message: "Shadow — the system has zero elevation" },
  { pattern: /\bbackdrop-blur|\bblur-/, message: "Blur / glass effect — not part of the system" },
  { pattern: /\bbg-gradient|\bbg-linear|\bbg-radial|\bbg-\[(?:radial|linear)/, message: "Gradient — the system is flat" },
  { pattern: /\bfont-(?:medium|semibold|bold|extrabold|black)\b/, message: "Heavy weight — sans never exceeds 400" },
  { pattern: /\bfont-serif\b/, message: "Legacy font-serif — use type-display / type-title / type-quote" },
  { pattern: /\b(?:text|bg|border)-(?:white|black)\b/, message: "white/black — use paper/ink" },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : [];
  });
}

const violations = [];

for (const file of walk(SCAN_DIR)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("design-lint-ignore")) return;
      if (/^\s*(\/\/|\/\*|\*|\{\/\*)/.test(line)) return; // comments
      for (const rule of RULES) {
        const match = line.match(rule.pattern);
        if (match) {
          violations.push(`${relative(ROOT, file)}:${i + 1}  ${match[0]}  → ${rule.message}`);
        }
      }
    });
}

if (violations.length > 0) {
  console.error(`✗ ${violations.length} design-system violation(s):\n`);
  console.error(violations.join("\n"));
  console.error("\nSee DESIGN.md. Add `design-lint-ignore` on the line only with a documented reason.");
  process.exit(1);
}

console.log("✓ Design system check passed");
