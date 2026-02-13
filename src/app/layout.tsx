import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	themeColor: "#f7f7f7",
};

export const metadata: Metadata = {
	title: "Atout Travaux | Maître d'œuvre - Auvergne-Rhône-Alpes",
	description:
		"Atout Travaux, maître d'œuvre tous corps d'état en Auvergne-Rhône-Alpes. Construction, rénovation et aménagement de vos projets avec un interlocuteur unique.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} antialiased`}>{children}</body>
		</html>
	);
}
