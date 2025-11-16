import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";

// Ensure a DOM exists for environments where jsdom isn't automatically applied
if (typeof globalThis.window === "undefined" || typeof globalThis.document === "undefined") {
  const dom = new JSDOM("<!doctype html><html><body></body></html>");
  // assign to globalThis (we declared types in src/types/test-globals.d.ts)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).window = dom.window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).document = dom.window.document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).navigator = dom.window.navigator;
}
