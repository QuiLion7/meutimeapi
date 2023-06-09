import React, { useEffect, useState } from 'react';
import Players from '../Players/Players';
import styles from './Teams.module.css';

const Teams = ({ league, season, selectedLeagueName, reset }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const apiKey = localStorage.getItem('apiKey');

  useEffect(() => {
    const fetchTeams = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      try {
        let savedTeams = localStorage.getItem('teams');
        if (savedTeams) {
          savedTeams = JSON.parse(savedTeams);
          setTeams(savedTeams);
        } else {
          const response = await fetch(url, options);
          if (response.ok) {
            const data = await response.json();
            const teams = data.response[0].league.standings[0].map((team) => ({
              id: team.team.id,
              name: team.team.name,
              logo: team.team.logo,
            }));
            setTeams(teams);
            localStorage.setItem('teams', JSON.stringify(teams));
          } else {
            throw new Error('Erro ao fazer a requisição');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, [league, season, apiKey]);

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
  };

  const handleChooseAgain = () => {
    reset();
  };

  const resetSelectedTeam = () => {
    setSelectedTeamId(null);
  };

  if (selectedTeamId) {
    const selectedTeam = teams.find((team) => team.id === selectedTeamId);
    if (selectedTeam) {
      const { id, name, logo } = selectedTeam;
      return (
        <Players
          reset={resetSelectedTeam}
          id={id}
          league={league}
          season={season}
          teamName={name}
          teamLogo={logo}
        />
      );
    }
  }

  return (
    <div className={styles.teams}>
      <h1>TEMPORADA {season}</h1>
      <p>Liga selecionada: {selectedLeagueName}</p>
      <p>Temporada selecionada: {season}</p>
      <div className={styles.cardContainer}>
        {teams.map((team, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => handleTeamClick(team.id)}
          >
            <h3>{team.name}</h3>
            {team.logo ? (
              <img
                src={team.logo}
                alt={team.name}
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
      <button className={styles.btn} onClick={handleChooseAgain}>
        VOLTAR
      </button>
    </div>
  );
};

export default Teams;