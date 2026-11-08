import "@testing-library/jest-dom";
import { afterEach } from "vitest";

// The sample dashboard mirrors its view into the URL; start every test from a clean address.
afterEach(() => {
  window.history.replaceState(null, "", "/");
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
