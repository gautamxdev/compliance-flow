/**
 * Percent-decode a URL path for people to read: "/t%C3%A9rms%20of%20use" →
 * "/térms of use". A malformed escape like "%E0%A4" is left as typed rather
 * than throwing.
 */
export function decodePath(pathname: string): string {
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
}
