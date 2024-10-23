import { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const loadSavedCandidates = () => {
      const candidates = localStorage.getItem('savedCandidates');
      if (candidates) {
        setSavedCandidates(JSON.parse(candidates));
      } else {
        setMessage('candidates not accepted.');
      }
    };

    loadSavedCandidates();
  }, []);

  const removeCandidate = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));

    if (updatedCandidates.length === 0) {
      setMessage(' candidates not accepted.');
    }
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div>
        {savedCandidates.length > 0 ? (
          savedCandidates.map((candidate) => (
            <div key={candidate.id}>
              <div >
                <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} className="saved-candidate-avatar" />
              </div>
              <div>
                <h2>{candidate.name}</h2>
                <p>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                  </a>
                </p>
              </div>
              <div>{candidate.location || "cannot find location "}</div>
              <div >{candidate.email || "contact not provided"}</div>
              <div>{candidate.company || "company info not provided"}</div>
              <div>
                <button onClick={() => removeCandidate(candidate.id)}>-</button>
              </div>
            </div>
          ))
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default SavedCandidates