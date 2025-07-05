const planets = [
    { name: "Mercury", color: "gray", moons: [] },
    { name: "Venus", color: "yellow", moons: [] },
    { name: "Earth", color: "blue", moons: ["Moon"] },
    { name: "Mars", color: "red", moons: ["Phobos", "Deimos"] },
    { name: "Jupiter", color: "orange", moons: ["Io", "Europa", "Ganymede", "Callisto"] },
    { name: "Saturn", color: "gold", moons: ["Titan", "Rhea", "Enceladus"] },
    { name: "Uranus", color: "lightblue", moons: ["Titania", "Oberon"] },
    { name: "Neptune", color: "blueviolet", moons: ["Triton"] }
];

const section = document.querySelector('.listPlanets');

planets.forEach(planet => {

    const planetDiv = document.createElement('div');
    planetDiv.className = 'planet';
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;

    section.appendChild(planetDiv);

    if (planet.moons.length > 0) {
        planet.moons.forEach(moon => {
            const moonDiv = document.createElement('div');
            moonDiv.className = 'moon';
            
            const x = Math.random() * 70; 
            const y = Math.random() * 70; 
            
            moonDiv.style.left = `${x}px`;
            moonDiv.style.top = `${y}px`;
            moonDiv.textContent = moon; 

            planetDiv.appendChild(moonDiv);
        });
    }
}); 