let root, doc;

if (typeof window !== 'undefined') {
  root = window;
  doc = root.document;
} else {
  // Handle non-browser environment
  root = globalThis; // Use globalThis for modern environments
  doc = null; // Set doc to null or handle it differently in non-browser environment
}

export { root, doc };
