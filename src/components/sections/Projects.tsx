"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const PARTNERS = [
	"Réseau Pro BTP",
	"Qualibat",
	"Artisans de confiance",
	"Maisons & Travaux",
	"FFB Auvergne",
];

export default function Projects() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scrollRange, setScrollRange] = useState(0);
	const [viewportH, setViewportH] = useState(0);

	useEffect(() => {
		function measure() {
			if (carouselRef.current) {
				setScrollRange(
					carouselRef.current.scrollWidth - window.innerWidth
				);
			}
			setViewportH(window.innerHeight);
		}
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

	return (
		<section
			id="realisations"
			ref={sectionRef}
			// Section height = viewport + scroll distance so vertical scroll maps 1:1 to horizontal
			style={{ height: scrollRange > 0 && viewportH > 0 ? scrollRange + viewportH : "auto" }}
		>
			<div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
				{/* Heading */}
				<div className="mb-8 md:mb-10">
					<Container>
						<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
							<ScrollReveal>
								<h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-foreground leading-[1.1] tracking-tight">
									Nos réalisations
								</h2>
							</ScrollReveal>
							<ScrollReveal delay={0.15}>
								<p className="text-[0.9375rem] text-foreground leading-relaxed lg:text-right lg:max-w-[340px] flex-shrink-0">
									Chaque projet est le reflet de notre exigence — intentionnel, soigné et sur mesure.
								</p>
							</ScrollReveal>
						</div>
					</Container>
				</div>

				{/* Partner logos marquee */}
				<Container>
					<div className="relative overflow-hidden mb-8 md:mb-10">
						<div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f7f7f7] to-transparent z-10" />
						<div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f7f7f7] to-transparent z-10" />
						<div className="flex items-center gap-12 py-3 animate-marquee">
							{[...PARTNERS, ...PARTNERS].map((name, i) => (
								<span
									key={i}
									className="text-[0.9375rem] font-semibold text-foreground/30 whitespace-nowrap flex-shrink-0"
								>
									{name}
								</span>
							))}
						</div>
					</div>
				</Container>

				{/* Horizontal scroll carousel — driven by vertical scroll */}
				<motion.div
					ref={carouselRef}
					style={{ x }}
					className="flex gap-3 pl-6 md:pl-8 lg:pl-[max(calc((100vw-1480px)/2+48px),48px)] pr-[30vw] will-change-transform"
				>
					{PROJECTS.map((project) => (
						<div
							key={project.title}
							className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[55vw] bg-white rounded-xl overflow-hidden"
						>
							{/* Image */}
							<div className="relative aspect-[16/10] rounded-xl overflow-hidden m-2 md:m-2.5">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover"
									sizes="(max-width: 810px) 85vw, 60vw"
								/>
								{/* Arrow button overlay */}
								<div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center -rotate-[20deg]">
									<svg width="18" height="18" viewBox="0 0 256 256" fill="white">
										<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
									</svg>
								</div>
							</div>

							{/* Content: title left, date right */}
							<div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4">
								<h5 className="text-[1rem] md:text-[1.125rem] font-semibold text-foreground">
									{project.title}
								</h5>
								<span className="text-[0.8125rem] text-foreground/50 flex-shrink-0 ml-4">
									{project.date}
								</span>
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
