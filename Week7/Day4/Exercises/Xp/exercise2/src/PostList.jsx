import React from 'react';
import posts from './posts.json';

function PostList() {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className="post-date">{post.date}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
