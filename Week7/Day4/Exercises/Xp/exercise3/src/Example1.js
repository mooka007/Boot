import React from 'react';
import data from './data.json';

class Example1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example1 Component</h2>
        {data.SocialMedias.map((url, index) => (
          <div key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default Example1;
