import styles from './Header.module.css';
import rocketLogo from '../assets/rocket.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={rocketLogo}></img>
            <h1 className={styles.title}>
                to<span>do</span>
            </h1>
        </header>
    );
}