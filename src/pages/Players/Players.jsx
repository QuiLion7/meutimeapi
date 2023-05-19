import React, { useEffect, useState } from 'react';
import styles from './Players.module.css';

const Players = ({ team, season }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/players?team=${team}&season=${season}`;
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
          const players = data.response.map((player) => ({
            name: player.player.name,
            age: player.player.age,
            nationality: player.player.birth.nationality,
            height: player.player.height,
            weight: player.player.weight,
            photo: player.player.photo,
          }));
          setPlayers(players);
        } else {
          throw new Error('Erro ao fazer a requisição');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [team, season]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (players.length === 0) {
    return <p className={styles.message_error}>Informações dos jogadores não encontrada no banco de dados.</p>;
  }

  return (
    <div className={styles.players}>
      <h1>Jogadores</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nacionalidade</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.nationality}</td>
              <td>{player.height}</td>
              <td>{player.weight}</td>
              <td>
                <img src={player.photo} alt={player.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
