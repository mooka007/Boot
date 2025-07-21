const fetchPosts = require('./fetch-data');

(async () => {
  const posts = await fetchPosts();
  posts.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
  });
})();