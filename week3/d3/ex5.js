//  assuming the html is present
const container = document.getElementById('container');
console.log(container);

const lists = document.querySelectorAll('ul.list');
lists.forEach(list => {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        if (item.textContent === "Pete") {
            item.textContent = "Richard";
        }
        if (item.textContent === "Dan") {
            item.remove();  }
    });
});

lists.forEach(list => {
    const firstItem = list.firstElementChild;
    firstItem.textContent = "YourName"; 
});

lists[0].class