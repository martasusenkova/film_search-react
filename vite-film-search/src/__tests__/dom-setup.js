import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.window = dom.window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.document = dom.window.document;
