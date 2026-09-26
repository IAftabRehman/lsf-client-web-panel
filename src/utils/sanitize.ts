/**
 * Input Sanitization & Anti-XSS Engine
 * Adheres strictly to Mandate #29
 */

/**
 * Escapes potentially hazardous HTML characters to prevent XSS injection
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');
}

/**
 * Strips all HTML tags entirely for plain text verification
 */
export function stripHtmlTags(input: string): string {
  if (!input) return '';
  return input.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Sanitizes and formats currency input masks
 */
export function sanitizeCurrencyInput(input: string): number {
  if (!input) return 0;
  const cleaned = input.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
