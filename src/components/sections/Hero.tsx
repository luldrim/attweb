"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ease = [0.25, 0.1, 0.25, 1] as const;

const CHAR_STAGGER = 0.02;
const CHAR_DURATION = 0.35;
const BLUR_AMOUNT = "8px";

function BlurReveal({
	text,
	delay = 0,
	className,
	as: Tag = "span",
}: {
	text: string;
	delay?: number;
	className?: string;
	as?: "span" | "h1";
}) {
	const chars = text.split("");

	return (
		<Tag className={className}>
			{chars.map((char, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0, filter: `blur(${BLUR_AMOUNT})` }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{
						duration: CHAR_DURATION,
						delay: delay + i * CHAR_STAGGER,
						ease: [0.19, 1, 0.22, 1],
					}}
					className="inline-block whitespace-pre"
				>
					{char}
				</motion.span>
			))}
		</Tag>
	);
}

export default function Hero() {
	const t = useTranslations("hero");
	const sectionRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

	const labelText = t("label");
	const headline = t.raw("headline") as string[];
	const line1 = headline[0];
	const line2 = headline[1];

	const labelDelay = 0.3;
	const line1Delay = labelDelay + labelText.length * CHAR_STAGGER + 0.1;
	const line2Delay = line1Delay + line1.length * CHAR_STAGGER;
	const buttonDelay = line2Delay + line2.length * CHAR_STAGGER + 0.15;

	return (
		<section id="accueil" ref={sectionRef} className="bg-white p-2.5 md:p-3 h-screen min-h-[600px]">
			<motion.div
				initial={{ scale: 1.05, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease }}
				className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden bg-black"
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

				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

				{/* Content */}
				<Container className="relative z-10 h-full flex flex-col items-center justify-center text-center">
					{/* Label */}
					<BlurReveal
						text={labelText}
						delay={labelDelay}
						className="text-[0.8125rem] md:text-[0.875rem] text-white/70 tracking-wide mb-5"
					/>

					{/* Heading — per-line blur reveal */}
					<div className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-light text-white leading-[1.1] tracking-tight max-w-[800px]">
						<BlurReveal text={line1} delay={line1Delay} as="h1" className="block" />
						<BlurReveal text={line2} delay={line2Delay} className="block" />
					</div>

					{/* CTA button */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: buttonDelay,
							ease,
						}}
					>
						<Link
							href="/request-quote"
							className="group mt-8 md:mt-10 inline-flex items-center justify-center px-8 py-3.5 bg-white text-foreground rounded-full text-[0.9375rem] font-medium overflow-hidden hover:bg-white/90 transition-colors duration-200"
						>
							<span className="relative block overflow-hidden">
								<span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
									{t("ctaButton")}
								</span>
								<span className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full" aria-hidden="true">
									{t("ctaButton")}
								</span>
							</span>
						</Link>
					</motion.div>
				</Container>

				{/* Bottom bar */}
				<Container className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10 flex items-end justify-between">
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: buttonDelay + 0.3, ease }}
						className="flex items-center gap-3"
					>
						<div className="group/badges flex cursor-pointer">
							{[
								"https://framerusercontent.com/images/DFpdCiQV48a6W3GFDaN4xOTZp0.jpeg",
								"https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg",
								"https://framerusercontent.com/images/2Y0ya9oktSQl8lubjb0qzVo77Ts.jpeg",
							].map((src, i) => (
								<div
									key={i}
									className={`w-10 h-10 md:w-10 md:h-10 lg:w-13 lg:h-13 rounded-full border-2 border-white overflow-hidden transition-[margin] duration-300 ease-out ${i > 0 ? "-ml-[18px] md:-ml-[18px] lg:-ml-[22px] group-hover/badges:md:-ml-1.5" : ""}`}
								>
									<Image
										src={src}
										alt=""
										width={52}
										height={52}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
						<span className="text-[0.8125rem] md:text-[0.8125rem] lg:text-[1.0625rem] text-white leading-snug">
							{t("statsLabel")}
							<br />
							{t("statsSubLabel")}
						</span>
					</motion.div>
				</Container>
			</motion.div>
		</section>
	);
}
