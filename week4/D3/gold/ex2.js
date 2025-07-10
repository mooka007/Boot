function keysAndValues(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const values = sortedKeys.map(key => obj[key]);
  return [sortedKeys, values];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
