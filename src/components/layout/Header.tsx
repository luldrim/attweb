"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Header() {
	const t = useTranslations("nav");
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

	const textDark = isMenuOpen || (isScrolled && !isOverDark);

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 right-0 transition-all duration-300",
					isMenuOpen ? "z-[60]" : "z-40",
					!isMenuOpen && isScrolled && !isOverDark
						? "bg-background/95 backdrop-blur-md"
						: "bg-transparent"
				)}
			>
				<Container className="flex items-center justify-between h-[72px] md:h-[80px]">
					{/* Logo */}
					<a
						href="#accueil"
						onClick={() => isMenuOpen && setIsMenuOpen(false)}
						className={cn(
							"text-[1.375rem] md:text-[1.5rem] tracking-tight transition-colors duration-300",
							textDark ? "text-foreground" : "text-white"
						)}
					>
						<span className="font-semibold">Atout</span>
						<span className="font-light italic ml-0.5">Travaux</span>
					</a>

					{/* Hamburger / Close — bars morph into X */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={cn(
							"relative p-2 transition-colors duration-300",
							textDark ? "text-foreground" : "text-white"
						)}
						aria-label={isMenuOpen ? t("menuCloseLabel") : t("menuOpenLabel")}
					>
						<div className="relative w-7 h-7">
							<span
								className={cn(
									"absolute left-[4px] right-[4px] h-[1.5px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
									isMenuOpen ? "top-[13.25px] rotate-45" : "top-[8.5px]"
								)}
							/>
							<span
								className={cn(
									"absolute left-[4px] right-[4px] h-[1.5px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
									isMenuOpen ? "top-[13.25px] -rotate-45" : "top-[18.5px]"
								)}
							/>
						</div>
					</button>
				</Container>
			</header>

			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
}
