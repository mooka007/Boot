import React from 'react';
import data from './data.json';

class Example2 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example2 Component</h2>
        {data.Skills.map((skillArea, index) => (
          <div key={index}>
            <h3>{skillArea.Area}</h3>
            <ul>
              {skillArea.SkillSet.map((skill, skillIndex) => (
                <li key={skillIndex}>
                  {skill.Name} {skill.Hot ? '(Hot)' : ''}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
