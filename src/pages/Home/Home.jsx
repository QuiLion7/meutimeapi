import React, { useEffect, useState, useRef } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import './Home.css';
import CountryDetails from '../CountryDetails/CountryDetails';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState(100);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const getCountries = async () => {
    const cachedData = localStorage.getItem('cachedCountries');
    if (cachedData) {
      setCountries(JSON.parse(cachedData));
      setLoading(false);
    } else {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/teams/countries';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '05c56a153fmsh0316eea3b4a3172p18732ejsn2cf4ad161111',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.response) {
          setCountries(result.response);
          localStorage.setItem('cachedCountries', JSON.stringify(result.response));
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const updateShowMoreItems = () => {
      if (window.innerWidth < 426) {
        setShowMoreItems(25);
      } else if (window.innerWidth < 768) {
        setShowMoreItems(50);
      } else {
        setShowMoreItems(100);
      }
    };

    updateShowMoreItems();

    resizeObserverRef.current = new ResizeObserver(updateShowMoreItems);
    resizeObserverRef.current.observe(window.document.body);

    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />;
  }

  return (
    <div className="country-list">
      <h1>Selecione o País</h1>
      <div className="cards-container">
        {countries && countries.slice(0, showMoreItems).map((country, index) => (
          <div
            key={country.name}
            className="country-card"
            onClick={() => handleCountryClick(country.name)}
          >
            <h3 className="country-title">{country.name}</h3>
            {country.flag ? (
              <img src={country.flag} alt={country.name} className="country-flag" />
            ) : (
              <span className="no-image-text">Sem imagem</span>
            )}
          </div>
        ))}
      </div>
      {countries.length > showMoreItems && (
        <div className="show-more">
          {showMore ? (
            <button className="slide-show-button" onClick={handleShowMoreClick}>
              Mostrar Menos <RiArrowUpSLine className="show-more-icon" />
            </button>
          ) : (
            <button className="slide-show-button" onClick={handleShowMoreClick}>
              Mostrar Mais <RiArrowDownSLine className="show-more-icon" />
            </button>
          )}
        </div>
      )}
      {showMore && (
        <div className="slide-show">
          {countries.slice(showMoreItems).map((country) => (
            <div
              key={country.name}
              className="slide-show-card"
              onClick={() => handleCountryClick(country.name)}
            >
              <h3 className="country-title">{country.name}</h3>
              {country.flag ? (
                <img src={country.flag} alt={country.name} className="country-flag" />
              ) : (
                <span className="no-image-text">Sem imagem</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
