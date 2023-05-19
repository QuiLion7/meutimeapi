import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Players from '../Players/Players';
import styles from './Teams.module.css';

const Teams = ({ league, season, selectedLeagueName }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '05c56a153fmsh0316eea3b4a3172p18732ejsn2cf4ad161111',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const teams = data.response[0].league.standings[0].map((team) => ({
            id: team.team.id,
            name: team.team.name,
            logo: team.team.logo,
          }));
          setTeams(teams);
        } else {
          throw new Error('Erro ao fazer a requisição');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, [league, season]);

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
  };

  if (selectedTeamId) {
    return <Players id={selectedTeamId} season={season} />;
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
            {team.logo && <img src={team.logo} alt={team.name} className={styles.logo} />}
          </div>
        ))}
      </div>
      <Link to='/countrydetails/:country' className={styles.btn}>
        Voltar
      </Link>
    </div>
  );
};

export default Teams;
