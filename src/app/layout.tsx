import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

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
			<body className={`${geistSans.variable} antialiased`}>
				{children}
				<Toaster
					position="top-center"
					toastOptions={{
						style: {
							fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
						},
						classNames: {
							warning: "[&_[data-icon]]:!text-red-500",
						},
					}}
				/>
			</body>
		</html>
	);
}
