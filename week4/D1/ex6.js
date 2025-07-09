(function(children, partner, location, job) {
  const sentence = `You will be a ${job} in ${location}, married to ${partner} with ${children} kids.`;
  document.body.innerHTML = `<h1 style="font-family: Arial; color: #333; padding: 20px;">${sentence}</h1>`;
})(2, "Alex", "Paris", "web developer");