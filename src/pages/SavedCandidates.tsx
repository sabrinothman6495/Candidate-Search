import { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

function SavedCandidates() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(storedCandidates);
    } catch (error) {
      console.error("Error loading saved candidates:", error);
      setSavedCandidates([]);
    }
  }, []);

  const handleRemoveCandidate = (username: string) => {
    setSavedCandidates(prevCandidates => {
      const updatedCandidates = prevCandidates.filter(candidate => candidate.login !== username);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
        savedCandidates.map(candidate => (
          <div key={candidate.login} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <img
              src={candidate.avatar_url || 'path/to/fallback-image.png'}
              alt={candidate.name || candidate.login}
              width="100" />
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
}

export default SavedCandidates;