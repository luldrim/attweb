"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ease = [0.25, 0.1, 0.25, 1] as const;
const CHAR_STAGGER = 0.02;
const CHAR_DURATION = 0.35;
const BLUR_AMOUNT = "8px";

function BlurRevealInView({
	text,
	delay = 0,
	className,
}: {
	text: string;
	delay?: number;
	className?: string;
}) {
	const ref = useRef<HTMLHeadingElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });
	const chars = text.split("");

	return (
		<h1 ref={ref} className={className}>
			{chars.map((char, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0, filter: `blur(${BLUR_AMOUNT})` }}
					animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
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
		</h1>
	);
}

interface LegalSection {
	title: string;
	content: string;
}

interface LegalPageProps {
	heading: string;
	lastUpdated: string;
	backLink: string;
	sections: LegalSection[];
}

export default function LegalPage({
	heading,
	lastUpdated,
	backLink,
	sections,
}: LegalPageProps) {
	const heroRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});
	const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

	return (
		<main className="bg-background">
			{/* Mini hero — same border/rounded pattern as main Hero */}
			<section ref={heroRef} className="bg-background p-2.5 md:p-3 h-[45vh] min-h-[300px] max-h-[420px]">
				<motion.div
					initial={{ scale: 1.05, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1.2, ease }}
					className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden bg-black"
					data-header-dark
				>
					{/* Background image — parallax */}
					<motion.div
						style={{ y: imageY, scale: imageScale }}
						className="absolute inset-0 will-change-transform"
					>
						<Image
							src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
							alt=""
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</motion.div>

					<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

					{/* Title centered at bottom */}
					<div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 text-center px-5">
						<BlurRevealInView
							text={heading}
							delay={0.3}
							className="text-[1.75rem] md:text-[2.25rem] font-light tracking-tight text-white mb-2"
						/>
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.7, ease }}
							className="text-sm text-white/40"
						>
							{lastUpdated}
						</motion.p>
					</div>
				</motion.div>
			</section>

			{/* Content */}
			<Container className="pt-2 pb-16 md:pb-20 max-w-3xl">
				<ScrollReveal delay={0} duration={0.5} distance={20}>
					<Link
						href="/"
						className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mb-12"
					>
						<span aria-hidden="true">&larr;</span> {backLink}
					</Link>
				</ScrollReveal>

				<div className="space-y-10">
					{sections.map((section, i) => (
						<ScrollReveal key={section.title} delay={0.05 * i} duration={0.6} distance={25}>
							<section>
								<h2 className="text-xl text-foreground mb-3">
									{section.title}
								</h2>
								<div className="text-[0.9375rem] leading-relaxed text-foreground/70 whitespace-pre-line">
									{section.content}
								</div>
							</section>
						</ScrollReveal>
					))}
				</div>
			</Container>
		</main>
	);
}
