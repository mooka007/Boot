const family = {
    father: "John",
    mother: "Mary",
    son: "Alex",
    daughter: "Emma"
};

for (const key in family) {
    console.log(key);
}

for (const key in family) {
    console.log(family[key]);
}