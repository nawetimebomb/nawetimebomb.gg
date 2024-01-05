import { useEffect, useRef } from "react";

export default function useHorizontalScroll() {
    const elementRef = useRef();

    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            const onWheel = event => {
                if (event.deltaY === 0) return;
                event.preventDefault();

                element.scrollTo({
                    left: element.scrollLeft - event.deltaY
                });
            };

            element.addEventListener("wheel", onWheel);

            return () => element.removeEventListener("wheel", onWheel);
        }
    }, []);

    return elementRef;
}
