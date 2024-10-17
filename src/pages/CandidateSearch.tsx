import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem('potentialCandidates') || '[]')
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchCandidate = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await searchGithub();
        if (isMounted) {
          setCandidate(response);
        }
      } catch (error) {
        console.error("Error fetching candidate:", error);
        if (isMounted) {
          setError("Failed to fetch candidate. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCandidate();

    return () => {
      isMounted = false; 
    };
  }, []);

  const handleAccept = () => {
    if (candidate) {
      setPotentialCandidates(prevCandidates => {
        const updatedCandidates = [...prevCandidates, candidate];
        localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
        return updatedCandidates;
      });
      setCandidate(null); // Clear candidate after accepting
    }
    fetchNewCandidate();
  };

  const handleReject = () => {
    fetchNewCandidate();
  };

  const fetchNewCandidate = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await searchGithub();
      setCandidate(response);
    } catch (error) {
      console.error("Error fetching new candidate:", error);
      setError("Failed to fetch new candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <button type="button" onClick={fetchNewCandidate}>
            Search New Candidate
          </button>
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
      {potentialCandidates.length > 0 ? (
        potentialCandidates.map((candidate: Candidate) => (
          <div key={candidate.login} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <img
              src={candidate.avatar_url || 'path/to/fallback-image.png'}
              alt={candidate.name || candidate.login}
              width="100"
            />
            <div>
              <p>{candidate.name}</p>
              <p>{candidate.login}</p>
              <p>{candidate.location}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
              <img src="" alt="" />

            </div>
          </div>
        ))
      ) : (
        <h2>No potential candidates</h2>
      )}
    </div>
  );
}

export default CandidateSearch;