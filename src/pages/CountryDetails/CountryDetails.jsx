import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import styles from './CountryDetails.module.css';
import Teams from '../Teams/Teams';

const CountryDetails = ({ country, reset }) => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const apiKey = localStorage.getItem('apiKey');

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
            'X-RapidAPI-Key': apiKey,
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
  }, [country, apiKey]);

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
    setSelectedLeagueId(selectedLeague.league.id);
  };

  const resetLeagueAndSeason = () => {
    setSelectedLeagueId(null);
    setSelectedSeason('');
  };

  if (selectedLeagueId && selectedSeason) {
    return (
      <Teams
        reset={resetLeagueAndSeason}
        league={selectedLeagueId}
        season={selectedSeason}
        selectedLeagueName={selectedLeague.league.name}
      />
    );
  }

  const handleReload = () => {
    reset();
  };

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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/balllogo.png';
                    }}
                  />
                ) : (
                  <img
                    src="/balllogo.png"
                    alt="Sem logo"
                    className={styles.logo}
                  />
                )}
              </div>
            ))}
          </div>
          <button className={styles.btn} onClick={handleReload}>
            VOLTAR
          </button>
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
                .sort((a, b) => b.year - a.year)
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