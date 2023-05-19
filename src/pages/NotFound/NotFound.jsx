import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className={styles.not_found}>
      <h1>Vamos Começar?</h1>
      <button className={styles.btn} onClick={handleRedirect}>Clique Aqui</button>
    </div>
  );
};

export default NotFound;
