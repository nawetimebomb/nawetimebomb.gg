import styles from "./GameDetails.module.css";

export default function GameDetails(props) {
    const {
        completedDate,
        firstTrophyDate,
        genre,
        hoursPlayed,
        platinumNumber,
        psnProfilesLink,
        rating,
        releaseDate,
        trophies,
        typeOfTrophy
    } = props;

    return (
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <div className={styles.platinumSection}>
                    <img alt={`Trophy: ${typeOfTrophy}`} src={`trophies/${typeOfTrophy}.png`} />
                    <span className={styles.platinumNumber}>{platinumNumber}</span>
                </div>
                <a href={psnProfilesLink} target="_blank">Check out on PSNProfiles.com</a>
            </li>
            <li className={styles.listItem}>
                <span>Released</span>
                <span>{releaseDate}</span>
            </li>
            <li className={styles.listItem}>
                <span>First trophy</span>
                <span>{firstTrophyDate}</span>
            </li>
            <li className={styles.listItem}>
                <span>Completed</span>
                <span>{completedDate}</span>
            </li>
            <li className={styles.listItem}>
                <span>Genre</span>
                <span>{genre}</span>
            </li>
            <li className={styles.listItem}>
                <span>Hours played</span>
                <span>{hoursPlayed}</span>
            </li>
            <li className={styles.listItem}>
                <span>Trophies</span>
                <span>{trophies}</span>
            </li>
            <li className={styles.listItemCentered}>
                <span className={styles.rating} style={getStyle()}>
                    {rating}/5
                </span>
            </li>
        </ul>
    );

    function getStyle() {
        const colors = {
            high: "#00dd00",
            mid: "#dddd00",
            low: "#dd0000"
        };
        const ratingColor = rating > 3 ? colors.high : rating < 3 ? colors.low : colors.mid;

        return {
            color: ratingColor
        };
    }
}
