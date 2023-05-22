import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=198772";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        localStorage.setItem("apiKey", apiKey);
        navigate("/home");
      } else {
        setError("Erro ao fazer a requisição. Verifique sua API Key e tente novamente.");
      }
      setApiKey(""); 
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao fazer a requisição. Por favor, tente novamente mais tarde.");
      setApiKey(""); 
    }
  };

  const handleInputChange = () => {
    setError(""); 
  };

  return (
    <div className={styles.login}>
      <h1>Meu Time</h1>
      <p>
        A API utilizada neste projeto é uma ferramenta poderosa para acessar informações e estatísticas de times esportivos. 
        Ela oferece uma ampla gama de dados, como jogadores, estatísticas de partidas, classificações e muito mais. 
      </p>
      <p>
      No entanto, para acessar e utilizar essa API, é necessário se inscrever no site oficial e obter uma chave de API exclusiva.
      A chave de API é essencial para autenticar suas solicitações e garantir que apenas usuários autorizados tenham acesso aos dados.
      </p>
      <a href="https://rapidapi.com/api-sports/api/api-football" target="_blank">Por isso, siga as etapas de registro no site oficial da API 
        e digite sua RapidAPI-Key para fazer login e utilizar o sistema.
      </a> 
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="apikey"
            required
            placeholder="API Key do usuário"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            onFocus={handleInputChange}
          />
        </label>
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;