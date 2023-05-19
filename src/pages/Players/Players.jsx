import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from './Players.module.css';
import { useNavigate } from 'react-router-dom';

const Players = ({ id, season, reset }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const apiKey = localStorage.getItem('apiKey');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/players?team=${id}&season=${season}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const players = data.response.map((player) => ({
            id: player.player.id,
            name: player.player.name || 'Indisponível',
            age: player.player.age || 'Indisponível',
            height: player.player.height || 'Indisponível',
            weight: player.player.weight || 'Indisponível',
            photo: player.player.photo,
          }));
          players.sort((a, b) => a.name.localeCompare(b.name));
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
  }, [id, season, apiKey]);

  const handleChooseAgain = () => {
    reset();
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.players}>
      <h1>Jogadores</h1>
      {players.length === 0 ? (
        <p className={styles.message_error}>Informações dos jogadores não encontradas no banco de dados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>
                <button className={styles.collapse_button} onClick={handleCollapse}>
                  {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                </button>
              </th>
            </tr>
          </thead>
          {!isCollapsed && (
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.age}</td>
                  <td>{player.height}</td>
                  <td>{player.weight}</td>
                  <td>
                    <img
                      src={player.photo || '/balllogo.png'}
                      alt={player.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/balllogo.png';
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      <button className={styles.btn} onClick={handleChooseAgain}>
        ESCOLHER NOVAMENTE
      </button>
    </div>
  );
};

export default Players;