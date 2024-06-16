import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function fetchGymData() {
    fetch('https://exercisedb.p.rapidapi.com/exercises', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '88a5caa34bmsh786063c90487b3fp1f931ejsna7b943284bb8',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchGymData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '' && searchTerm=='') {
      alert('please enter something')
      return;
    }
    const filteredData = data.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <>
      <div className="header-part">
        <div className="header-context">
          <h1>Awesome Exercises You Should Know</h1>
          <input
            placeholder="Enter Exercise"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="category"></div>
      </div>
      {data.length > 0 ? (
        <ul className="card-list">
          {data.map((exercise) => (
            <li key={exercise.id} className="card">
              <img src={exercise.gifUrl} alt={exercise.name} />
              <h2>{exercise.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading... not data found</p>
      )}
    </>
  );
}

export default App;