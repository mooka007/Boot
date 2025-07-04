const prompt = require("prompt-sync")();

function hotelCost() {
    let nights = parseInt(prompt("How many nights would you like to stay in the hotel? : "));
    
    while (isNaN(nights) || nights <= 0) {
        nights = parseInt(prompt("Please enter a valid number of nights (must be greater than 0) : "));
    }

    return nights * 140;
}

function planeRideCost() {
    let destination = prompt("Please enter your destination : ");
    
    while (!destination || typeof destination !== 'string') {
        destination = prompt("Please enter a valid destination (text required) : ");
    }

    destination = destination.toLowerCase();
    
    switch (destination) {
        case "london":
            return 183;
        case "paris":
            return 220;
        default:
            return 300;
    }
}

function rentalCarCost() { 
    let days = parseInt(prompt("How many days would you like to rent the car? : "));
    
    while (isNaN(days) || days <= 0) {
        days = parseInt(prompt("Please enter a valid number of days (must be greater than 0) : "));
    }
    
    let cost = days * 40; 
    if (days > 10) {
        cost *= 0.95; 
    }
    return cost;
}


function totalVacationCost(){
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();

        console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);

}

totalVacationCost();