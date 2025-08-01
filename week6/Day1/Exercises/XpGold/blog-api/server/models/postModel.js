let posts = [
  {
    id: 1,
    title: 'Getting Started with Express',
    content: 'Express is a minimal and flexible Node.js web application framework...',
    timestamp: new Date('2023-01-15T10:00:00Z')
  },
  {
    id: 2,
    title: 'REST API Best Practices',
    content: 'When building REST APIs, there are several best practices to follow...',
    timestamp: new Date('2023-01-20T14:30:00Z')
  }
];

let nextId = 3;

module.exports = {
  getAllPosts: () => posts.sort((a, b) => b.timestamp - a.timestamp),
  getPostById: (id) => posts.find(post => post.id === id),
  createPost: (title, content) => {
    if (!title || !content) {
      throw new Error('Title and content are required');
    }
    const newPost = {
      id: nextId++,
      title,
      content,
      timestamp: new Date()
    };
    posts.push(newPost);
    return newPost;
  },
  updatePost: (id, title, content) => {
    const post = posts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    if (!title || !content) {
      throw new Error('Title and content are required');
    }
    post.title = title;
    post.content = content;
    return post;
  },
  deletePost: (id) => {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    return posts.splice(index, 1)[0];
  }
};
