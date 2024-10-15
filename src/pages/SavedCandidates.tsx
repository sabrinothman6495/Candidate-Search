import { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove a candidate from the saved list
  const handleRemoveCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.login} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <img 
              src={candidate.avatar_url || 'path/to/fallback-image.png'} 
              alt={candidate.name || candidate.login} 
              width="100" 
            />

            <div>
              <h2>{candidate.name || 'No Name Available'}</h2>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'No Location Available'}</p>
              <p>Email: {candidate.email || 'No Email Available'}</p>
              <p>Company: {candidate.company || 'No Company Available'}</p>
            </div>
            <div>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
              <br />
              <button onClick={() => handleRemoveCandidate(candidate.login)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <h2>No candidates saved</h2>
      )}
    </div>
  );
};

export default SavedCandidates;
