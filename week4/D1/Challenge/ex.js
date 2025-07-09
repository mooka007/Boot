const client = 'John';
const groceries = {
    fruits: ['pear', 'apple', 'banana'],
    vegetables: ['tomatoes', 'cucumber', 'salad'],
    totalPrice: '20$',
    other: {
        paid: true,
        meansOfPayment: ['cash', 'creditCard']
    }
};

// Part 1: Display groceries
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// Part 2: Clone groceries and test pass by reference/value
const cloneGroceries = () => {
    let user = client;
    client = 'Betty';
    console.log('User:', user); 
    
    let shopping = groceries;
    shopping.totalPrice = '35$';
    console.log('Groceries totalPrice:', groceries.totalPrice); 
    shopping.other.paid = false;
    console.log('Groceries paid:', groceries.other.paid); 
};

displayGroceries();
cloneGroceries();