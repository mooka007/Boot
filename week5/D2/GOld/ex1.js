const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

fetch(giphyUrl)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const gifUrl = data.data.images.original.url; 
    const img = document.createElement("img");
    img.src = gifUrl;
    document.body.appendChild(img);
  })
  .catch(error => console.error("Error fetching GIF:", error));