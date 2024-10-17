import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API'; 
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
  });
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(''); 
  useEffect(() => {
    fetchNewCandidate();
  }, []);

  const fetchNewCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchGithub();
      setCandidate(response);
    } catch (error) {
      setError("Failed to fetch candidate.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (candidate) {
      const updatedCandidates = [...potentialCandidates, candidate];
      setPotentialCandidates(updatedCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
      fetchNewCandidate();
    }
  };

  const handleReject = () => {
    fetchNewCandidate();
  };

  const handleUserSearch = async () => {
    if (username) {
      try {
        const user = await searchGithubUser(username);
        setCandidate(user);
      } catch (error) {
        setError("Failed to fetch user.");
      }
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search by username"
      />
      <button onClick={handleUserSearch}>Search User</button>
      {loading ? <p>Loading...</p> : (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {candidate && (
            <>
              <h2>{candidate.name}</h2>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location}</p>
              <img src={candidate.avatar_url} alt={candidate.name} />
              <p>Email: {candidate.email}</p>
              <p>HTML URL: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a></p>
              <p>Company: {candidate.company}</p>
              <button onClick={handleAccept}>+</button>
              <button onClick={handleReject}>-</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;