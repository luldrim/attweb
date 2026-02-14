"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { QUOTE_CAROUSEL_IMAGES } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function QuoteCarousel() {
	const tProjects = useTranslations("projects");
	const tTestimonials = useTranslations("testimonials");
	const projectItems = tProjects.raw("items") as Array<{ title: string; date: string }>;
	const testimonialItems = tTestimonials.raw("items") as Array<{ name: string; role: string; quote: string }>;

	const slides = QUOTE_CAROUSEL_IMAGES.map((image, i) => ({
		image,
		title: projectItems[i]?.title ?? "",
		quote: testimonialItems[i]?.quote ?? "",
		author: testimonialItems[i]?.name ?? "",
		role: testimonialItems[i]?.role ?? "",
	}));

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % slides.length);
		}, 6000);
		return () => clearInterval(timer);
	}, [slides.length]);

	const slide = slides[current];

	return (
		<div className="hidden lg:block lg:w-1/2 p-3">
			{/* Inset panel with rounded corners */}
			<div className="relative w-full h-full rounded-[20px] overflow-hidden bg-foreground">
				{/* Background image */}
				<AnimatePresence mode="wait">
					<motion.div
						key={current}
						initial={{ opacity: 0, scale: 1.05 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease }}
						className="absolute inset-0"
					>
						<Image
							src={slide.image}
							alt={slide.title}
							fill
							className="object-cover"
							sizes="50vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
					</motion.div>
				</AnimatePresence>

				{/* Content overlay */}
				<div className="relative z-10 flex flex-col justify-end p-8 xl:p-10 w-full h-full">
					<AnimatePresence mode="wait">
						<motion.div
							key={current}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, delay: 0.15, ease }}
						>
							{/* Quote */}
							<p className="text-white/90 text-[1rem] xl:text-[1.0625rem] leading-relaxed max-w-[420px] mb-6 font-light">
								&ldquo;{slide.quote}&rdquo;
							</p>

							{/* Author */}
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[0.875rem] font-medium">
									{slide.author.charAt(0)}
								</div>
								<div>
									<p className="text-white text-[0.875rem] font-medium">
										{slide.author}
									</p>
									<p className="text-white/50 text-[0.8125rem]">
										{slide.role}
									</p>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Dots */}
					<div className="flex gap-2 mt-8">
						{slides.map((_, i) => (
							<button
								key={i}
								onClick={() => setCurrent(i)}
								className="h-[3px] rounded-full transition-all duration-300 cursor-pointer"
								style={{
									width: i === current ? 32 : 8,
									backgroundColor:
										i === current
											? "rgba(255,255,255,0.9)"
											: "rgba(255,255,255,0.3)",
								}}
								aria-label={`Slide ${i + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
