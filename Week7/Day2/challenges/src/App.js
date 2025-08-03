import { useState } from 'react';

export default function App() {
  const [languages, setLanguages] = useState([
    {name: "Php", votes: 0},
    {name: "Python", votes: 0},
    {name: "JavaScript", votes: 0},
    {name: "Java", votes: 0}
  ]);

  const handleVote = (index) => {
    setLanguages(prevLanguages => 
      prevLanguages.map((language, i) => 
        i === index 
          ? { ...language, votes: language.votes + 1 }
          : language
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Vote Your Language!
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {languages.map((language, index) => (
            <div 
              key={language.name}
              className="flex items-center justify-between p-6 border-b border-gray-200 last:border-b-0 bg-yellow-50 hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-600 w-8">
                  {language.votes}
                </span>
                <span className="text-xl font-medium text-gray-800">
                  {language.name}
                </span>
              </div>
              
              <button
                onClick={() => handleVote(index)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                Click Here
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Total votes: {languages.reduce((sum, lang) => sum + lang.votes, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}