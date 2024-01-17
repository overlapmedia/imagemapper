let root: (Window & typeof globalThis) | typeof globalThis;
let doc: Document;

if (window != null) {
    root = window;
    doc = root.document;
} else {
    root = globalThis;
    doc = root.document;
}

export { root, doc };
