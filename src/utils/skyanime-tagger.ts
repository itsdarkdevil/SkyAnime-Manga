// SKYANIME Component Tagger
// This is a replacement for lovable-tagger

export function componentTagger() {
  return {
    name: 'skyanime-tagger',
    transform(code: string, id: string) {
      if (id.endsWith('.tsx') && code.includes('export default')) {
        const componentName = id.split('/').pop()?.replace('.tsx', '');
        if (componentName) {
          const taggedCode = code.replace(
            'export default',
            `// SKYANIME Component: ${componentName}\nexport default`
          );
          return taggedCode;
        }
      }
      return code;
    }
  };
}
