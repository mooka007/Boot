const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("gif-form");
const input = document.getElementById("gif-input");
const deleteAllBtn = document.getElementById("delete-all");
const gifsContainer = document.getElementById("gifs-container");

async function fetchRandomGif(searchTerm) {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${searchTerm}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching GIF:", error);
        return null;
    }
}

function displayGif(gifData) {
    if (!gifData) return;

    const gifContainer = document.createElement("div");
    gifContainer.className = "gif-container";

    const img = document.createElement("img");
    img.src = gifData.images.original.url;
    img.alt = gifData.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", () => {
        gifContainer.remove();
    });

    gifContainer.appendChild(img);
    gifContainer.appendChild(deleteBtn);
    gifsContainer.appendChild(gifContainer);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim();
    if (!searchTerm) return;

    input.value = ""; 
    const gifData = await fetchRandomGif(searchTerm);
    displayGif(gifData);
});

deleteAllBtn.addEventListener("click", () => {
    gifsContainer.innerHTML = "";
});