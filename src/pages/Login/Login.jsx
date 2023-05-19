import { useState } from "react";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [apiKey, setApiKey] = useState("");
  const [isValidApiKey, setIsValidApiKey] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "https://api-football-v1.p.rapidapi.com/v3/teams/countries";
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
        // Chave válida, permite o acesso à página Home
        setIsValidApiKey(true);
      } else {
        // Chave inválida, exibe mensagem de erro
        setIsValidApiKey(false);
        setIsButtonClicked(true);
      }
      setApiKey(""); // Limpa o valor do input
    } catch (error) {
      console.error(error);
      // Ocorreu um erro, exibe mensagem de erro
      setIsValidApiKey(false);
      setIsButtonClicked(true);
      setApiKey(""); // Limpa o valor do input
    }
  };

  const handleInputChange = () => {
    if (isButtonClicked) {
      setIsButtonClicked(false); // Limpa as mensagens de erro
    }
  };

  if (isValidApiKey) {
    // Chave válida, redireciona para a página Home
    return (
      <div className={styles.login}>
        <p>Chave válida, clique no botão abaixo para prosseguir:</p>
        <button className="btn" onClick={() => onLogin(apiKey)}>
          HOME
        </button>
        <p>ou clique em "Home" na barra de navegação</p>
      </div>
    );
  }

  return (
    <div className={styles.login}>
      <h1>Chave API Key</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>API Key:</span>
          <input
            type="text"
            name="apikey"
            required
            placeholder="API Key do usuário"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            onFocus={handleInputChange} // Limpa as mensagens de erro ao selecionar o input
          />
        </label>
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
      {isButtonClicked && apiKey && !isValidApiKey && (
        <p className="error">Chave inválida: tente outra.</p>
      )}

    </div>
  );
};

export default Login;
