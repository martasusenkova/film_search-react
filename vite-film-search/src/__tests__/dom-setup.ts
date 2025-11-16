import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).window = dom.window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).document = dom.window.document;
// do not overwrite navigator if environment provides a read-only getter

export {};
