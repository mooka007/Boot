const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const giphyUrl = `https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=${apiKey}`;

fetch(giphyUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching GIFs:", error);
  });