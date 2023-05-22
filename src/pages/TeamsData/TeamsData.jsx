import styles from './TeamsData.module.css';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const TeamsData = ({ league, season, teamId }) => {
  const [data, setData] = useState(null);
  const apiKey = localStorage.getItem('apiKey');

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(`cachedData_${league}_${season}_${teamId}`);
      if (cachedData) {
        setData(JSON.parse(cachedData));
      } else {
        const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${league}&season=${season}&team=${teamId}`;
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
            const result = await response.json();
            setData(result);
            localStorage.setItem(`cachedData_${league}_${season}_${teamId}`, JSON.stringify(result));
          } else {
            throw new Error('Erro ao fazer a requisição');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (apiKey) {
      fetchData();
    }
  }, [league, season, teamId, apiKey]);

  if (!data) {
    return null;
  }

 
  const totalGoalsScored = data.response.goals.for.total.total || 'Indisponível';
  const totalGoalsConceded = data.response.goals.against.total.total || 'Indisponível';
  const mostUsedFormation = data.response.lineups[0].formation || 'Indisponível';
  const totalGamesPlayed = data.response.fixtures.played.total || 'Indisponível';
  const totalGamesWon = data.response.fixtures.wins.total || 'Indisponível';
  const totalGamesDrawn = data.response.fixtures.draws.total || 'Indisponível';
  const totalGamesLost = data.response.fixtures.loses.total || 'Indisponível';

  const goalsConcededPerMinutes = {
    '0-15': {
      title: '0-15',
      total: data.response.goals.against.minute['0-15'].total || 0,
      percentage: data.response.goals.for.minute['0-15'].percentage || 0,
    },
    '16-30': {
      title: '16-30',
      total: data.response.goals.against.minute['16-30'].total || 0,
      percentage: data.response.goals.for.minute['16-30'].percentage || 0,
    },
    '31-45': {
      title: '31-45',
      total: data.response.goals.against.minute['31-45'].total || 0,
      percentage: data.response.goals.for.minute['31-45'].percentage || 0,
    },
    '46-60': {
      title: '46-60',
      total: data.response.goals.against.minute['46-60'].total || 0,
      percentage: data.response.goals.for.minute['46-60'].percentage || 0,
    },
    '61-75': {
      title: '61-75',
      total: data.response.goals.against.minute['61-75'].total || 0,
      percentage: data.response.goals.for.minute['61-75'].percentage || 0,
    },
    '76-90': {
      title: '76-90',
      total: data.response.goals.against.minute['76-90'].total || 0,
      percentage: data.response.goals.for.minute['76-90'].percentage || 0,
    },
    '91-105': {
      title: '91-105',
      total: data.response.goals.against.minute['91-105'].total || 0,
      percentage: data.response.goals.for.minute['91-105'].percentage || 0,
    },
    '106-120': {
      title: '106-120',
      total: data.response.goals.for.minute['106-120'].total || 0,
      percentage: data.response.goals.for.minute['106-120'].percentage || 0   
    }
  };

  const goalsScoredPerMinutes = {
    '0-15': {
      title: '0-15',
      total: data.response.goals.for.minute['0-15'].total || 0,
      percentage: data.response.goals.for.minute['0-15'].percentage || 0,
    },
    '16-30': {
      title: '16-30',
      total: data.response.goals.for.minute['16-30'].total || 0,
      percentage: data.response.goals.for.minute['16-30'].percentage || 0,
    },
    '31-45': {
      title: '31-45',
      total: data.response.goals.for.minute['31-45'].total || 0,
      percentage: data.response.goals.for.minute['31-45'].percentage || 0,
    },
    '46-60': {
      title: '46-60',
      total: data.response.goals.for.minute['46-60'].total || 0,
      percentage: data.response.goals.for.minute['46-60'].percentage || 0,
    },
    '61-75': {
      title: '61-75',
      total: data.response.goals.for.minute['61-75'].total || 0,
      percentage: data.response.goals.for.minute['61-75'].percentage || 0,
    },
    '76-90': {
      title: '76-90',
      total: data.response.goals.for.minute['76-90'].total || 0,
      percentage: data.response.goals.for.minute['76-90'].percentage || 0,
    },
    '91-105': {
      title: '91-105',
      total: data.response.goals.for.minute['91-105'].total || 0,
      percentage: data.response.goals.for.minute['91-105'].percentage || 0,
    },
    '106-120': {
      title: '106-120',
      total: data.response.goals.for.minute['106-120'].total || 0,
      percentage: data.response.goals.for.minute['106-120'].percentage || 0   
    }
  };

  return (
    <div className={styles.teams}>
      <table>
        <thead>
          <tr>
            <th>Informação</th>
            <th>Valores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gols Feitos</td>
            <td>{totalGoalsScored}</td>
          </tr>
          <tr>
            <td>Total Sofridos</td>
            <td>{totalGoalsConceded}</td>
          </tr>
          <tr>
            <td>Formação Preferida</td>
            <td>{mostUsedFormation}</td>
          </tr>
          <tr>
            <td>Total de Jogos</td>
            <td>{totalGamesPlayed}</td>
          </tr>
          <tr>
            <td>Total de Vitórias</td>
            <td>{totalGamesWon}</td>
          </tr>
          <tr>
            <td>Total de Empates</td>
            <td>{totalGamesDrawn}</td>
          </tr>
          <tr>
            <td>Total Derrotas</td>
            <td>{totalGamesLost}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.charts}>
        <div className={styles.charts_minutes}>
          <h3>Gols Sofridos por Minuto</h3>
          <Chart
            options={{
              chart: {
                type: 'pie',
              },
            }}
            series={Object.values(goalsConcededPerMinutes).map((item) => item.total)}
            labels={Object.keys(goalsConcededPerMinutes)}
            type="pie"
          />
        </div>
        <div className={styles.charts_minutes}>
          <h3>Gols Feitos por Minuto</h3>
          <Chart
            options={{
              chart: {
                type: 'pie',
              },
            }}
            series={Object.values(goalsScoredPerMinutes).map((item) => item.total)}
            labels={Object.keys(goalsScoredPerMinutes)}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsData;