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