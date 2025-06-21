Prism.languages.noble = {
  comment: {
    pattern: /#.*/,
    greedy: true,
  },
  string: {
    pattern: /"(?:\\.|[^"\\])*"/,
    greedy: true,
  },
  number: /\b\d*\.\d+|\b\d+\.\d*|\b\d+\b/,
  keyword:
    /\b(?:module|import|class|interface|enum|implements|function|var|const|throw|if|else|return|public|private|static|new|this|if|else|while|for|in|try|catch)\b/,
  constant: /\b(?:true|false|null)\b/,
  type: [
    {
      // Explicit types
      pattern: /\b(?:int|long|float|bool|string|type)\b/,
      alias: "property",
    },
    {
      // Type annotation (`a: int`)
      pattern: /(?<=:)\s*[a-zA-Z_][a-zA-Z_0-9]*/,
      alias: "property",
    },
    {
      // Type followed by `.new`
      pattern: /\b[a-zA-Z_][a-zA-Z_0-9]*\b(?=\.new)/,
      alias: "property",
    },
    {
      // Generic types like Foo<Bar,Baz>
      pattern: /\b[a-zA-Z_][a-zA-Z_0-9]*\s*<[^>]+>/,
      alias: "property",
      inside: {
        punctuation: /[<>(),]/,
        type: /\b[a-zA-Z_][a-zA-Z_0-9]*\b/,
      },
    },
  ],
  function: {
    pattern: /\b[a-zA-Z_][a-zA-Z_0-9!?]*\s*(?=\()/,
    alias: "function",
  },
  operator: {
    pattern: /\b(not|or|and|ifnot)\b|[-+*/=<>:?]/,
    alias: "keyword",
  },
  identifier: {
    pattern: /\b[a-zA-Z_][a-zA-Z_0-9!?]*\b/,
    alias: "variable",
  },
  punctuation: /[{}[\];(),.:]/,
};
