import React, { useEffect, useState } from 'react';
import './App.css';
import Card from 'components/Card/Card';
import SAMPLE_QUOTES_RESPONSE from 'quotes.sample.json';
import { fetchQuotes } from 'api';

export default function App() {
  const [favoriteListe, setFavoriteListe] = useState(JSON.parse(localStorage.getItem('favoriteListe')) || [])
  const [favoriteQuotes, setFavoriteQuotes] = useState([])
  const [sampleQuotes, setSampleQuotes] = useState([])
  const [quotes, setQuotes] = useState(SAMPLE_QUOTES_RESPONSE.quotes)
  const skipSteps = 10
  const limit = 10
  const [skip, setSkip] = useState(skipSteps)
  const [isLoading, setIsLoading]= useState(false)
  const setFavorite = (id) => {
    if (favoriteListe.indexOf(id) !== -1) {
      setFavoriteListe(favoriteListe.filter(el => el !== id))
    } else {
      setFavoriteListe((prev) => [...prev, id])
    }
  }
  const intialization = async () => {
    const data = await fetchQuotes(limit, 0)
    setQuotes(data)
  }

  const loadData = async () => {
    setIsLoading(true)
    const data = await fetchQuotes(limit, skip)
    setQuotes(prev => prev.concat(data))
    setIsLoading(false)
  }

  useEffect(() => {
    intialization()
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteListe', JSON.stringify(favoriteListe));
    setFavoriteQuotes(() =>
      quotes.filter(({ id }) => favoriteListe.indexOf(id) !== -1)
        .sort((a, b) => (a.id > b.id ? 1 : -1)))
    setSampleQuotes(() =>
      quotes.filter(({ id }) => favoriteListe.indexOf(id) === -1)
        .sort((a, b) => (a.id > b.id ? 1 : -1)))
  }, [quotes, favoriteListe, setFavoriteListe])

  const deleteAllFavorite = (e) => {
    e.preventDefault()
    localStorage.setItem('favoriteListe', "[]")
    setFavoriteListe([])
  }

  return (
    <div className='App'>
      <h2>Favorites</h2>
      {favoriteQuotes.length > 0 && favoriteQuotes.map(({ author, id, quote }) => {
        return (
          <Card
            key={id}
            id={id}
            quote={quote}
            author={author}
            isFavorite={true}
            setFavorite={setFavorite}
          />
        );
      })}
      {
        favoriteQuotes.length === 0 && <p>There's no favorite quote selected yet!</p>
      }
      <button
        className='btn'
        disabled={favoriteQuotes.length === 0}
        onClick={(e) => deleteAllFavorite(e)}
      >
        Clear Favorites
      </button>
      <button
        className='btn'
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault()
          setSkip(prev => prev + skipSteps)
          loadData()
        }}
      >
        Load more
      </button>
      <h2>Quotes</h2>
      {sampleQuotes.map(({ author, id, quote }) => {
        return (
          <Card
            key={id}
            id={id}
            quote={quote}
            author={author}
            isFavorite={false}
            setFavorite={setFavorite}
          />
        );
      })}
      {
        sampleQuotes.length === 0 && <p>There's no quote available now!</p>
      }
    </div>
  );
}
