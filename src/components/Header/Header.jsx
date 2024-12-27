import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img
          src="/images/TravelTrucks.svg" // Абсолютный путь к логотипу
          alt="TravelTrucks Logo"
          className={styles.logoImage}
        />
      </a>
      <nav className={styles.nav}>
        <ul className={styles.ulclass}>
          <li className={styles.link_li}>
            <NavLink
              to="/"
              className={`${styles.navLink} ${
                location.pathname === '/' ? styles.active : ''
              }`}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.link_li}>
            <NavLink
              to="/catalog"
              className={`${styles.navLink} ${
                location.pathname === '/catalog' ? styles.active : ''
              }`}
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
