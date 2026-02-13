"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
	useEffect(() => {
		const isMobile = window.matchMedia("(max-width: 810px)").matches;

		const lenis = new Lenis({
			duration: isMobile ? 2.4 : 1.6,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: isMobile ? 1.0 : 1.5,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		// Sync with anchor clicks (smooth scroll to #id)
		const onClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
			if (!anchor) return;
			const id = anchor.getAttribute("href");
			if (!id || id === "#") return;
			const el = document.querySelector(id);
			if (el) {
				e.preventDefault();
				lenis.scrollTo(el as HTMLElement);
			}
		};
		document.addEventListener("click", onClick);

		// Pause lenis when modal/menu locks body scroll
		const observer = new MutationObserver(() => {
			if (document.body.style.overflow === "hidden") {
				lenis.stop();
			} else {
				lenis.start();
			}
		});
		observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

		return () => {
			lenis.destroy();
			document.removeEventListener("click", onClick);
			observer.disconnect();
		};
	}, []);

	return null;
}
