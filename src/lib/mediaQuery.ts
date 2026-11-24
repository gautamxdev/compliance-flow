type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
  removeListener?: (cb: (e: MediaQueryListEvent) => void) => void;
};

/**
 * Subscribe to a media query's "change" event and return the unsubscribe.
 * Safari before 14 only has the deprecated addListener/removeListener, and
 * calling addEventListener there throws, so fall back to those.
 */
export function onMediaQueryChange(
  mql: MediaQueryList,
  listener: (e: MediaQueryListEvent) => void,
): () => void {
  const legacy = mql as LegacyMediaQueryList;
  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }
  if (typeof legacy.addListener === "function") {
    legacy.addListener(listener);
    return () => legacy.removeListener?.(listener);
  }
  return () => {};
}
