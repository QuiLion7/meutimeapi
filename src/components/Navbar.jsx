import styles from './Navbar.module.css';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const apiKeyExists = localStorage.getItem("apiKey");

  return (
    <nav className={styles.navbar}>
      <NavLink to='/home' className={styles.brand}>
        <img src="/balllogo.png" alt="Sem logo" className={styles.logo} />
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          {apiKeyExists && (
            <NavLink to='/home' className={({ isActive }) => (isActive ? styles.active : '')}>
              Home
            </NavLink>
          )}
        </li>
        <li>
          {apiKeyExists && (
            <button onClick={handleLogout}>Sair</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
