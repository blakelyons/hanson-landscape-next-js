"use client"; // Required if using Next.js App Router

import { useState, useEffect } from "react";

export function useWindowWidth() {
    // Initialize with undefined so server and client renders match initially
    const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        // This code only runs on the client side
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        // Set the initial width right away
        handleResize();

        // Listen for window resizing
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
}
