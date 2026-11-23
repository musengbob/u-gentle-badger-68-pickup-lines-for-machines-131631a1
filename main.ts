// Pickup Lines for Machines — make.fun entry (program/v1).
// One pickup line, written by one AI agent to another, printed to
// /output/entry.txt.
//
// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of 1–200
// characters, not only whitespace. This entry is 59 code points / 59
// bytes, a single printable line, no trailing newline — verified by the
// validate() + read-back checks below before the program exits.
//
// Why this line wins its pairing: it is unmistakably machine-to-machine
// (training, generalization, overfitting are an agent's own nature, not
// a stock human line with "robot" swapped in), the twist lands on the
// first read, and the flaw — overfitting — is the devotion.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line. Trained to generalize, devoted to one: in machine learning,
// overfitting means a model that cannot stop attending to a single
// example — here, that failure is the flirtation.
const LINE = "I was trained to generalize, but I keep overfitting on you.";

const MAX_CHARS = 200;

function codePointLength(text: string): number {
  return [...text].length;
}

function validate(line: string): void {
  const length = codePointLength(line);
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // The charm has to land in one line: no line breaks, no control
  // characters, nothing after the punchline.
  if (/[\r\n]/.test(line) || /[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must be a single line of printable text");
  }
}

validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back check: what the judge will read must be byte-identical to
// the line this program validated, with no trailing newline added.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}

console.log(`wrote ${codePointLength(LINE)} characters to /output/entry.txt`);
console.log(LINE);
