"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isOverDark, setIsOverDark] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > 50);

			const darkSections = document.querySelectorAll("[data-header-dark]");
			let overDark = false;
			for (const section of darkSections) {
				const rect = section.getBoundingClientRect();
				if (rect.top <= 80 && rect.bottom >= 80) {
					overDark = true;
					break;
				}
			}
			setIsOverDark(overDark);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [isMenuOpen]);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
					isScrolled && !isOverDark
						? "bg-background/95 backdrop-blur-md"
						: "bg-transparent"
				}`}
			>
				<Container className="flex items-center justify-between h-[72px] md:h-[80px]">
					{/* Logo */}
					<a
						href="#accueil"
						className={`text-[1.375rem] md:text-[1.5rem] tracking-tight transition-colors ${
							isScrolled && !isOverDark ? "text-foreground" : "text-white"
						}`}
					>
						<span className="font-semibold">Atout</span>
						<span className="font-light italic ml-0.5">Travaux</span>
					</a>

					{/* Hamburger — always visible */}
					<button
						onClick={() => setIsMenuOpen(true)}
						className={`p-2 transition-colors ${
							isScrolled && !isOverDark ? "text-foreground" : "text-white"
						}`}
						aria-label="Ouvrir le menu"
					>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
							<line x1="4" y1="9" x2="24" y2="9" />
							<line x1="4" y1="19" x2="24" y2="19" />
						</svg>
					</button>
				</Container>
			</header>

			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
}
