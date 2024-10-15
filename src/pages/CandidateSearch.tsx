import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [potentialCandidates, setPotentialCandidates] = useState(
    JSON.parse(localStorage.getItem('potentialCandidates') || '[]')
  );

  useEffect(() => {
    let isMounted = true; 

    const fetchCandidate = async () => {
      setLoading(true);
      const response = await searchGithub();
      if (isMounted) {
        setCandidate(response);
      }
      setLoading(false);
    };

    fetchCandidate();

    return () => {
      isMounted = false; 
    };
  }, []);

  const handleAccept = () => {
    if (candidate) {
      setPotentialCandidates([...potentialCandidates, candidate]);
      localStorage.setItem('potentialCandidates', JSON.stringify([...potentialCandidates, candidate]));
    }
    fetchNewCandidate();
  };

  const handleReject = () => {
    fetchNewCandidate();
  };

  const fetchNewCandidate = async () => {
    setLoading(true);
    const response = await searchGithub();
    setCandidate(response);
    setLoading(false);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{candidate?.name}</h2>
          <p>Username: {candidate?.login}</p>
          <p>Location: {candidate?.location}</p>
          {candidate && <img src={candidate.avatar_url} alt={candidate.name} />}
          <p>Email: {candidate?.email}</p>
          <p>HTML URL: {candidate?.html_url}</p>
          <p>Company: {candidate?.company}</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
      <h2>Potential Candidates:</h2>
      <ul>
        {potentialCandidates.map((candidate: Candidate, index: number) => (
          <li key={index}>
            <p>{candidate.name}</p>
            <p>{candidate.location}</p>
            <p>{candidate.email}</p>
            <p>{candidate.company}</p>
            <p>{candidate.html_url}</p>
            <img src={candidate.avatar_url} alt={candidate.name} />
                     
         </li>
        ))}
      </ul>
    </div>
  );
}

export default CandidateSearch;
