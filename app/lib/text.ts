// Joins the last two words of a heading with a non-breaking space so a
// trailing number (e.g. "Grade 9") never gets orphaned onto its own line
// at narrow widths.
export function keepLastWordTogether(text: string): string {
  const lastSpace = text.lastIndexOf(" ");
  if (lastSpace === -1) return text;
  return `${text.slice(0, lastSpace)} ${text.slice(lastSpace + 1)}`;
}
