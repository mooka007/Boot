import React from 'react';
import data from './data.json';

class Example3 extends React.Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        {data.Experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{exp.companyName}</h3>
            <img 
              src={exp.logo} 
              alt={exp.companyName} 
              style={{ width: '100px', height: '100px' }} 
            />
            <a href={exp.url} target="_blank" rel="noopener noreferrer">Website</a>
            {exp.roles.map((role, roleIndex) => (
              <div key={roleIndex}>
                <h4>{role.title}</h4>
                <p>{role.description}</p>
                <p>{role.startDate} to {role.endDate}</p>
                <p>{role.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
