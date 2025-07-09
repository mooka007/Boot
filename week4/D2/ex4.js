
// Map
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

// Filter
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log(fullStackResidents);


// Both
const fullStackLastNames = users
  .filter(user => user.role === 'Full Stack Resident')
  .map(resident => resident.lastName);
console.log(fullStackLastNames);
