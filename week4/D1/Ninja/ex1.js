const mergeWords = string => nextString =>
  nextString === undefined ? string : mergeWords(`${string} ${nextString}`);