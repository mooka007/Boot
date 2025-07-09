//  part 1
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        const juiceDiv = document.createElement('div');
        juiceDiv.innerHTML = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}`;
        document.body.appendChild(juiceDiv);
    }
    
    addIngredients('apple', 'orange', 'carrot');
}

makeJuice('large');

//  part 2

function makeJuice(size) {
    const ingredients = [];
    
    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }
    
    function displayJuice() {
        const juiceDiv = document.createElement('div');
        juiceDiv.innerHTML = `
            <p>The client wants a ${size} juice, containing:</p>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
        document.body.appendChild(juiceDiv);
    }
    
    // Add 6 ingredients (2 calls × 3 ingredients each)
    addIngredients('apple', 'orange', 'carrot');
    addIngredients('ginger', 'beetroot', 'spinach');
    
    displayJuice();
}

makeJuice('medium');