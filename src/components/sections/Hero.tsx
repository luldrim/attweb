"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	// Parallax: image moves slower than scroll
	const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

	return (
		<section id="accueil" ref={sectionRef} className="p-2.5 md:p-3 h-screen min-h-[600px]">
			{/* Rounded image container */}
			<motion.div
				initial={{ scale: 1.05, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease }}
				className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden"
			>
				{/* Background image — parallax */}
				<motion.div
					style={{ y: imageY, scale: imageScale }}
					className="absolute inset-0 will-change-transform"
				>
					<Image
						src="https://framerusercontent.com/images/DFpdCiQV48a6W3GFDaN4xOTZp0.jpeg"
						alt="Projet architectural"
						fill
						priority
						className="object-cover"
						sizes="100vw"
					/>
				</motion.div>

				{/* Subtle gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

				{/* Content — centered */}
				<Container className="relative z-10 h-full flex flex-col items-center justify-center text-center">
					{/* Label */}
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.5, ease }}
						className="text-[0.8125rem] md:text-[0.875rem] text-white/70 tracking-wide mb-5"
					>
						#1 Maître d&apos;œuvre en Auvergne-Rhône-Alpes
					</motion.span>

					{/* Main heading */}
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.7, ease }}
						className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-light text-white leading-[1.1] tracking-tight max-w-[800px]"
					>
						Construisons votre
						<br />
						projet de vie
					</motion.h1>

					{/* Single CTA button — white pill */}
					<motion.a
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 1.0, ease }}
						href="#contact"
						className="mt-8 md:mt-10 inline-flex items-center justify-center px-8 py-3.5 bg-white text-foreground rounded-full text-[0.9375rem] font-medium hover:bg-white/90 transition-colors"
					>
						Demander un devis
					</motion.a>
				</Container>

				{/* Bottom bar — trust badge (left) */}
				<Container className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10 flex items-end justify-between">
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 1.3, ease }}
						className="flex items-center gap-3"
					>
						<div className="flex -space-x-2">
							{[
								"https://framerusercontent.com/images/oDC12RKl3RMQUdu2JGGhxj544M.jpeg",
								"https://framerusercontent.com/images/ZokFTvIUZIDAmlsADCohr7aSmA.jpeg",
								"https://framerusercontent.com/images/2Y0ya9oktSQl8lubjb0qzVo77Ts.jpeg",
							].map((src, i) => (
								<div key={i} className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden">
									<Image
										src={src}
										alt=""
										width={32}
										height={32}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
						<span className="text-[0.8125rem] text-white/60">
							Plus de 500 projets réalisés
						</span>
					</motion.div>
				</Container>
			</motion.div>
		</section>
	);
}
