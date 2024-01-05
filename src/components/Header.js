import styles from "./Header.module.css";

export default function Header(props) {
    const { completedGames } = props;
    return (
        <header className={styles.container}>
            <img className={styles.logo} alt="NAWETIMEBOMB.gg logo" src="logo.png" />
            <div className={styles.completedLabel}>Completed games: {completedGames}</div>
        </header>
    );
}
