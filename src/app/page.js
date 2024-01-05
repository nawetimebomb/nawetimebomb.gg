"use client";

import { useEffect, useRef, useState } from "react";
import GameDetails from "@local/components/GameDetails";
import GamesList from "@local/components/GamesList";
import games from "@local/data/games.json";
import Header from "@local/components/Header";

import styles from "./page.module.css";

export default function Home() {
    const { completed } = games;
    const [currentPlatinum, setCurrentPlatinum] = useState(completed[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const mainElement = useRef();

    useEffect(() => {
        setIsAnimating(true);

        setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        mainElement.current.focus();
    }, [currentPlatinum]);

    return (
        <div {...getProps()}>
            <div {...getBackgroundProps()} />
            <div className={styles.backgroundDefault} />
            <div className={styles.backgroundOverlay} />
            <div className={styles.container}>
                <Header completedGames={completed.length} />
                <main className={styles.main}>
                    <GamesList {...getGamesListProps()} />
                    <div {...getContentSectionProps()}>
                        <div className={styles.contentDescription}>
                            <h2 className={styles.gameName}>{currentPlatinum.name}</h2>
                            {currentPlatinum.review.map((paragraph, index) => (
                                <p key={index} className={styles.paragraph}>{paragraph}</p>
                            ))}
                        </div>
                        <div className={styles.contentDetails}>
                            <GameDetails {...getDetailsProps()} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

    function getProps() {
        return {
            className: styles.player,
            onKeyDown: handleKeyDown,
            ref: mainElement,
            tabIndex: 0
        };
    }

    function getBackgroundProps() {
        const { platinumNumber } = currentPlatinum;

        return {
            className: styles.background,
            style: {
                backgroundImage: !isAnimating && `url(/backgrounds/${platinumNumber}.jpg)`,
                opacity: isAnimating ? 0 : 1,
                transition: !isAnimating && "opacity 0.5s 0.1s ease-in-out"
            }
        };
    }

    function getGamesListProps() {
        return {
            className: styles.gameSelector,
            currentPlatinum,
            games: completed,
            setCurrentPlatinum,
        };
    }

    function getContentSectionProps() {
        return {
            className: styles.content,
            style: {
                opacity: isAnimating ? 0 : 1,
                transition: !isAnimating && "opacity 0.5s ease-in-out"
            }
        };
    }

    function getDetailsProps() {
        const { platinumNumber } = currentPlatinum;

        return {
            ...currentPlatinum.details,
            platinumNumber
        };
    }

    function handleKeyDown(event) {
        const { platinumNumber } = currentPlatinum;
        let newNumber = platinumNumber;

        event.preventDefault();
        event.stopPropagation();

        if (event.keyCode === 37) {
            if (platinumNumber < completed.length) {
                newNumber = platinumNumber + 1;
            }
        }

        if (event.keyCode === 39) {
            if (platinumNumber > 1) {
                newNumber = platinumNumber - 1;
            }
        }

        if (platinumNumber !== newNumber) {
            const platinumIndex = completed.findIndex((element) => element.platinumNumber === newNumber);

            setCurrentPlatinum(completed[platinumIndex]);
        }
    }
}
