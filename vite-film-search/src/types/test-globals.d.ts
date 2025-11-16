declare global {
  // test environment globals
  var window: Window & typeof globalThis;
  var document: Document;
  var navigator: Navigator;
}

export {};
