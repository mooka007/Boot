const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log(building.numberOfFloors);

console.log(building.numberOfAptByFloor.firstFloor + 
            building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1].toLowerCase();
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent[secondTenant][0]);

const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;

console.log("Le loyer de Dan a été augmenté à 1200.");
}
 else {
    console.log("Le loyer de Dan reste inchangé.");
}

console.log("Loyer actuel de Dan :", building.numberOfRoomsAndRent.dan[1]);