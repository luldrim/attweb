"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import ContactButton from "@/components/ui/ContactButton";

export default function BeforeAfter() {
	const [expertOpen, setExpertOpen] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	// Before image clips away from left → only visible on right → then gone
	const beforeClipPath = useTransform(scrollYProgress, (v: number) => {
		const pct = Math.min(100, Math.max(0, (v / 0.35) * 100));
		return `inset(0 0 0 ${pct}%)`;
	});

	// Inverse clip for Après label — reveals from left as before clips away
	const afterClipPath = useTransform(scrollYProgress, (v: number) => {
		const pct = Math.min(100, Math.max(0, (v / 0.35) * 100));
		return `inset(0 ${100 - pct}% 0 0)`;
	});

	// Parallax: slow vertical drift
	const parallaxY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);


	return (
		<section ref={sectionRef} data-header-dark className="isolate h-[250vh]">
			<div className="sticky top-0 h-screen p-2.5 md:p-3">
			  <div className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden">
				{/* Parallax wrapper for both images */}
				<motion.div
					className="absolute -inset-[4%]"
					style={{ y: parallaxY }}
				>
					{/* After image (base layer — always visible) */}
					<Image
						src="/images/after.png"
						alt="Cuisine après travaux"
						fill
						className="object-cover"
						sizes="100vw"
						priority
					/>

					{/* Before image (on top — clips away from left to right) */}
					<motion.div
						className="absolute inset-0"
						style={{
							clipPath: beforeClipPath,
							WebkitClipPath: beforeClipPath as unknown as string,
						}}
					>
						<Image
							src="/images/before.png"
							alt="Cuisine avant travaux"
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</motion.div>
				</motion.div>

				{/* Bottom gradient */}
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

				{/* Content overlay */}
				<div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						{/* Text */}
						<div className="max-w-lg">
							<span className="inline-block text-accent text-[0.75rem] uppercase tracking-widest font-semibold mb-2">
								Rénovation complète
							</span>
							<h2 className="text-white text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-light leading-[1.1] tracking-tight">
								Transformation cuisine — Clermont&#8209;Ferrand
							</h2>
							<p className="text-white/60 text-[0.9375rem] leading-relaxed mt-3 max-w-md">
								D&apos;une cuisine vétuste à un espace moderne et fonctionnel, en seulement 6 semaines.
							</p>
						</div>

						{/* Expert notch — single element that morphs */}
						<div
							className="hidden md:block shrink-0 cursor-pointer"
							onMouseEnter={() => setExpertOpen(true)}
							onMouseLeave={() => setExpertOpen(false)}
						>
							<div
								className="overflow-hidden transition-all duration-300 ease-out"
								style={{
									width: expertOpen ? 260 : "fit-content",
									borderRadius: expertOpen ? 16 : 999,
									backgroundColor: expertOpen ? "#fff" : "rgba(255,255,255,0.1)",
									backdropFilter: expertOpen ? "none" : "blur(24px)",
									boxShadow: expertOpen ? "0 8px 30px rgba(0,0,0,0.15)" : "none",
								}}
							>
								{/* Avatar + identity */}
								<div className={`flex items-center gap-3 transition-all duration-300 ease-out ${expertOpen ? "p-4 pb-3" : "pl-1.5 pr-5 py-1.5"}`}>
									<div
										className="overflow-hidden shrink-0 transition-all duration-300 ease-out"
										style={{
											width: expertOpen ? 48 : 36,
											height: expertOpen ? 48 : 36,
											borderRadius: expertOpen ? 8 : 999,
										}}
									>
										<Image
											src="https://framerusercontent.com/images/ZokFTvIUZIDAmlsADCohr7aSmA.jpeg"
											alt="Thomas Durand"
											width={48}
											height={48}
											className="object-cover w-full h-full"
										/>
									</div>
									<div>
										<div
											className="font-medium leading-tight transition-colors duration-300"
											style={{
												color: expertOpen ? "#1a1a1a" : "#fff",
												fontSize: expertOpen ? "0.875rem" : "0.8125rem",
												fontWeight: expertOpen ? 600 : 500,
											}}
										>
											Thomas Durand
										</div>
										<div
											className="leading-tight transition-colors duration-300"
											style={{
												color: expertOpen ? "#6b7280" : "rgba(255,255,255,0.5)",
												fontSize: expertOpen ? "0.75rem" : "0.6875rem",
											}}
										>
											Chef de projet
										</div>
									</div>
								</div>

								{/* Expandable footer */}
								<div
									className="transition-all duration-300 ease-out overflow-hidden"
									style={{
										maxHeight: expertOpen ? 60 : 0,
										opacity: expertOpen ? 1 : 0,
									}}
								>
									<div className="border-t border-black/8 px-4 py-2.5 flex items-center justify-between gap-3">
										<p className="text-muted text-[0.75rem] leading-snug">
											Suivi qualité &amp; délais
										</p>
										<ContactButton variant="secondary" className="px-4 py-1.5 text-[0.75rem] whitespace-nowrap shrink-0">
											Contactez-moi
										</ContactButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Avant label — inside clip so it disappears with the before image */}
				<motion.div
					className="absolute inset-0 pointer-events-none"
					style={{
						clipPath: beforeClipPath,
						WebkitClipPath: beforeClipPath as unknown as string,
					}}
				>
					<div className="absolute top-24 right-5 md:top-28 md:right-8 bg-black/40 backdrop-blur-md text-white text-[0.8125rem] font-medium px-4 py-1.5 rounded-full">
						Avant
					</div>
				</motion.div>

				{/* Après label — clips in from left (inverse of before) */}
				<motion.div
					className="absolute inset-0 pointer-events-none"
					style={{
						clipPath: afterClipPath,
						WebkitClipPath: afterClipPath as unknown as string,
					}}
				>
					<div className="absolute top-24 left-5 md:top-28 md:left-8 bg-white/90 backdrop-blur-md text-foreground text-[0.8125rem] font-medium px-4 py-1.5 rounded-full">
						Après
					</div>
				</motion.div>
			  </div>
			</div>
		</section>
	);
}
