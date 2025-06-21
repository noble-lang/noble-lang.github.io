Prism.languages.vanadium = {
  comment: [
    {
      // Doc comment: @/
      pattern: /@\/.*/,
      greedy: true,
      alias: "doc-comment",
    },
    {
      // Single-line comment: @@
      pattern: /@@.*/,
      greedy: true,
      alias: "comment",
    },
    {
      // Multi-line comment: @* *@
      pattern: /@\*[\s\S]*?\*@/,
      greedy: true,
      alias: "comment",
    },
  ],

  keyword:
    /\b(?:if|else|elif|while|for|in|repeat|until|defer|delete|match|case|default|func|return|class|public|private|override|struct|iface|impl|enum|let|const|static|discard|from|include|typeof|throw|try|catch|guard|as|unless|ifso|new|destruct|unsafe|break|continue|delete|export|sealed|abstract)\b/,

  boolean: /\b(true|false|null)\b/,

  number: [
    /\b0x[0-9a-fA-F]+\b/, // Hex
    /\b0b[01]+\b/, // Binary
    /\b\d+\.\d+\b/, // Float
    /\b\d+\b/, // Integer
  ],

  string: {
    pattern: /"(?:\\.|[^"\\])*"/,
    greedy: true,
  },

  function: {
    pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
    alias: "function",
  },

  type: {
    pattern:
      /\b(int|short|long|uint|ushort|ulong|float|double|string|bool|void|tname)\b/,
    alias: "property",
  },

  operator: /[-+*/%=!<>]=?|[&|^~]|\b(or|and|ifnot)\b/,

  punctuation: /[{}[\];(),.:]/,

  variable: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
};
