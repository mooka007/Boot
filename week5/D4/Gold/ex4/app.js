const { faker } = require('@faker-js/faker');
const prompt = require('prompt-sync')();

const users = [];

function addFakeUser() {
  users.push({
    name: faker.person.fullName(),
    address: {
      street: faker.location.streetAddress(),
      country: faker.location.country()
    }
  });
}

for (let i = 0; i < 5; i++) {
  addFakeUser();
}

function addRealUser() {
  const name = prompt('Enter your full name: ');
  const street = prompt('Enter your street address: ');
  const country = prompt('Enter your country: ');
  
  users.push({
    name,
    address: { street, country }
  });
}

addRealUser();
console.log(users);