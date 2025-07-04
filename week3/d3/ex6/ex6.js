const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");
const newText = document.createTextNode("Logout");
newLi.appendChild(newText);

const ul = navBar.querySelector("ul");
ul.appendChild(newLi);

const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link:", firstLi.textContent);
console.log("Last link:", lastLi.textContent);