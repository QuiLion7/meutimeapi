import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [showSlideShow, setShowSlideShow] = useState(false);
  const [slideShowItems, setSlideShowItems] = useState(100);

  const getCountries = async () => {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleCountryClick = (name) => {
    console.log(`Clicked on country: ${name}`);
  };

  const handleSlideShowClick = () => {
    setShowSlideShow(!showSlideShow);
  };

  useEffect(() => {
    const updateSlideShowItems = () => {
      if (window.innerWidth < 425) {
        setSlideShowItems(25);
      } else if (window.innerWidth < 768) {
        setSlideShowItems(50);
      } else {
        setSlideShowItems(100);
      }
    };

    window.addEventListener('resize', updateSlideShowItems);
    return () => {
      window.removeEventListener('resize', updateSlideShowItems);
    };
  }, []);

  return (
    <div className="country-list">
      <h1>Lista de Países</h1>
      <div className="cards-container">
        {countries && countries.slice(0, slideShowItems).map((country, index) => (
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
      {countries.length > slideShowItems && (
        <div className="show-more">
          <button className="slide-show-button" onClick={handleSlideShowClick}>
            {showSlideShow ? 'Fechar Slide Show' : 'Mostrar Mais'}
          </button>
        </div>
      )}
      {showSlideShow && (
        <div className="slide-show">
          {countries.slice(slideShowItems).map((country) => (
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
