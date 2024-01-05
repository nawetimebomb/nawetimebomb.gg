import { Inter } from "next/font/google";

import games from "@local/data/games.json";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "NAWETIMEBOMB.gg",
    description: "Nawe's PlayStation 5 Trophy Collection",
};

export default function RootLayout({ children }) {
    const { completed } = games;

    return (
        <html lang="en">
            <head>
                {completed.map((item) => (
                    <link key={item.platinumNumber} rel="preload" as="image" href={`/backgrounds/${item.platinumNumber}.jpg`} />
                ))}
            </head>
            <body>{children}</body>
        </html>
    );
}
