import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to='/login' className={styles.brand}>
        Meu <span>Time</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : '')}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/home' className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
