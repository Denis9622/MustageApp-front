import { NavLink, useLocation, Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <a href="/">
          <span className={styles.logospan}>psychologists.</span>services
        </a>
      </h1>

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
              Psychologists
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.userAuth}>
        <Link to="/signin" className={styles.linkAuth}>
          <p className={styles.signup}>Log In</p>
        </Link>
        <Link to="/signup" className={styles.linkAuth}>
          <p className={styles.registration}>Registration</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
