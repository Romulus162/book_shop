import React, { useState, useEffect } from 'react';
import './GenrePopup.css';

const GenrePopup = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const requestBody = {
      query: `
      query{
        genres {
          name
        }
      }`,
    };

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(resData => {
        setGenres(resData.data.genres);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      {genres.map(genre => (
        <div key={genre._id}>{genre.name}</div>
      ))}
    </div>
  );
};

export default GenrePopup;
