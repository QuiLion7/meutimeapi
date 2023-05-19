import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import styles from './CountryDetails.module.css';
import Teams from '../Teams/Teams';

const CountryDetails = ({ country, handleSelectedLeague }) => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      const cachedData = localStorage.getItem(country);
      if (cachedData) {
        setLeagues(JSON.parse(cachedData));
        setLoading(false);
      } else {
        const apiUrl = `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '05c56a153fmsh0316eea3b4a3172p18732ejsn2cf4ad161111',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        };

        try {
          const response = await fetch(apiUrl, options);
          const result = await response.json();
          if (result.response) {
            setLeagues(result.response);
            localStorage.setItem(country, JSON.stringify(result.response));
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    };

    fetchLeagues();
  }, [country]);

  const openModal = (league) => {
    setSelectedLeague(league);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectSeason = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleProceed = () => {
    handleSelectedLeague(selectedLeague.league.id, selectedSeason);
  };

  if (selectedLeague && selectedSeason) {
    return <Teams league={selectedLeague.league.id} season={selectedSeason} selectedLeagueName={selectedLeague.league.name} />;
  }

  return (
    <div className={styles.countryDetails}>
      <h1>País: {country}</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className={styles.cardContainer}>
            {leagues.map((league) => (
              <div
                key={league.league.id}
                className={styles.card}
                onClick={() => openModal(league)}
              >
                <h3>{league.league.name}</h3>
                {league.league.logo ? (
                  <img
                    src={league.league.logo}
                    alt={league.league.name}
                    className={styles.logo}
                  />
                ) : (
                  <span>Sem logo</span>
                )}
              </div>
            ))}
          </div>
          <Link to="/" className={styles.btn}>
            Voltar
          </Link>
        </>
      )}
      {showModal && selectedLeague && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              <RiCloseLine />
            </button>
            <h2>{selectedLeague.league.name}</h2>

            <select
              value={selectedSeason}
              onChange={handleSelectSeason}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="" disabled>
                Selecione uma temporada
              </option>
              {selectedLeague.seasons
                .sort((a, b) => b.year - a.year) // Ordena as temporadas em ordem decrescente
                .map((season) => (
                  <option key={season.year} value={season.year}>
                    {season.year}
                  </option>
                ))}
            </select>
            <button className={styles.proceedButton} onClick={handleProceed}>
              Prosseguir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
