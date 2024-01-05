import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import useHorizontalScroll from "@local/hooks/useHorizontalScroll";

import styles from "./GamesList.module.css";

export default function GamesList(props) {
    const { className, currentPlatinum, games, setCurrentPlatinum } = props;
    const scrollRef = useHorizontalScroll();
    const element = useRef();

    useEffect(() => {
        const estimatedSizeOfItem = 60;

        scrollRef.current.scrollTo({
            behavior: "smooth",
            left: element.current.offsetLeft - estimatedSizeOfItem
        });
    }, [currentPlatinum]);

    return (
        <div className={classNames(styles.container, className)} ref={scrollRef}>
            {games.map(renderGame)}
        </div>
    );

    function renderGame(game) {
        const { name, platinumNumber, thumbnail } = game;

        return (
            <div key={platinumNumber} {...getGameContainerProps(game)}>
                <div className={styles.imageContainer}>
                    <img alt={getImageAltText(game)}
                         className={styles.image}
                         src={`/covers/${platinumNumber}.jpg`} />
                </div>
                {platinumNumber === currentPlatinum.platinumNumber &&
                 <h2 className={styles.name}>{name}</h2>}
            </div>
        );
    }

    function getGameContainerProps(game) {
        const { accent, platinumNumber } = game;

        return {
            className: classNames({
                [styles.gameContainer]: true,
                [styles.gameContainerSelected]: platinumNumber === currentPlatinum.platinumNumber
            }),
            ref: platinumNumber === currentPlatinum.platinumNumber ? element : null,
            onClick: () => {
                setCurrentPlatinum(game);
            },
            style: {
                borderColor: accent || "#cccccc"
            }
        };
    }

    function getImageAltText(game) {
        const { name, platinumNumber } = game;

        return `Platinum ${platinumNumber}: ${name}`;
    }
}
