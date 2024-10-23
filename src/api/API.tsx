const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;



    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Data:', data); 
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      console.error('Network error:', err);
      throw new Error('error please try again.');
    } else {
      console.error('Error fetching GitHub users:', err);
      throw err;
    }
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      console.error('Network error occurred:', err);
      throw new Error('A network error occurred. Please try again.');
    } else {
      console.error('Error fetching GitHub user:', err);
      throw err;
    }
  }
};

export { searchGithub, searchGithubUser };
