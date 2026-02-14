"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import ContactButton from "@/components/ui/ContactButton";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

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
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	const chars = text.split("");

	return (
		<h2 ref={ref} className={className}>
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
		</h2>
	);
}

export default function CTAFooter() {
	const t = useTranslations("ctaFooter");
	const tFooter = useTranslations("footer");
	const tCompany = useTranslations("company");
	const legalItems = tFooter.raw("legal") as Array<{ label: string; href: string }>;

	return (
		<footer id="contact" data-header-dark>
			{/* CTA section with background image */}
			<div className="relative h-[70vh] md:h-[85vh] min-h-[430px] md:min-h-[500px] overflow-hidden">
				<Image
					src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
					alt="Projet architectural"
					fill
					className="object-cover"
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

				<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
					<StaggerContainer stagger={0.15}>
						<StaggerItem>
							<span className="inline-block text-[0.75rem] uppercase font-semibold tracking-widest text-accent mb-3 md:mb-4">
								{t("preheading")}
							</span>
						</StaggerItem>
					</StaggerContainer>

					<BlurRevealInView
						text={t("heading")}
						delay={0.2}
						className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-white leading-[1.1] tracking-tight mb-3 md:mb-4 max-w-2xl [word-break:keep-all]"
					/>

					<StaggerContainer stagger={0.15} delay={0.6}>
						<StaggerItem>
							<p className="text-[0.9375rem] md:text-[1.0625rem] text-white/60 max-w-lg mb-7 md:mb-10 leading-relaxed">
								{t("description")}
							</p>
						</StaggerItem>
						<StaggerItem>
							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<ContactButton variant="white" size="lg">
									{t("primaryButton")}
								</ContactButton>
								<ContactButton variant="glass" size="lg">
									{t("secondaryButton")}
								</ContactButton>
							</div>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</div>

			{/* Footer info — dark background */}
			<div className="bg-foreground">
				<div className="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14">
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-8 py-8 md:py-12">
						{/* Company info */}
						<ScrollReveal delay={0} duration={0.6} distance={25}>
							<div className="shrink-0">
								<div className="flex items-baseline gap-1.5 mb-1.5">
									<span className="text-[1rem] md:text-[1.25rem] font-bold text-white">Atout</span>
									<span className="text-[1rem] md:text-[1.25rem] font-light text-white">Travaux</span>
								</div>
								<p className="text-[0.6875rem] md:text-[0.75rem] text-white/40 leading-relaxed">
									{tCompany("tagline")}
								</p>
							</div>
						</ScrollReveal>

						{/* Contact + Legal */}
						<div className="md:contents">
							<ScrollReveal delay={0.1} duration={0.6} distance={25}>
								<div>
									<h4 className="text-[0.75rem] md:text-[0.8125rem] font-semibold text-white mb-2 md:mb-3">{tFooter("contactHeading")}</h4>
									<ul className="space-y-1.5 text-[0.6875rem] md:text-[0.75rem] text-white/40">
										<li>
											<a href={tCompany("phoneHref")} className="hover:text-white/70 transition-colors">
												{tCompany("phone")}
											</a>
										</li>
										<li>
											<a href={`mailto:${tCompany("email")}`} className="hover:text-white/70 transition-colors">
												{tCompany("email")}
											</a>
										</li>
										<li className="hidden md:list-item">{tCompany("address")}</li>
									</ul>
								</div>
							</ScrollReveal>

							<ScrollReveal delay={0.2} duration={0.6} distance={25} className="hidden md:block">
								<div>
									<h4 className="text-[0.8125rem] font-semibold text-white mb-3">{tFooter("legalHeading")}</h4>
									<ul className="space-y-1.5">
										{legalItems.map((item) => (
											<li key={item.label}>
												<a
													href={item.href}
													className="text-[0.75rem] text-white/40 hover:text-white/70 transition-colors"
												>
													{item.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							</ScrollReveal>
						</div>
					</div>

					{/* Copyright + legal links */}
					<ScrollReveal duration={0.5} distance={15} viewportMargin="-20px">
						<div className="py-4 border-t border-white/10 flex justify-between items-center text-[0.65rem] md:text-[0.7rem] text-white/25">
							<span className="hidden md:inline">&copy; {new Date().getFullYear()} {tCompany("name")}. {tFooter("copyright")}</span>
							<div className="flex gap-4">
								{legalItems.map((item) => (
									<a key={item.label} href={item.href} className="md:hidden whitespace-nowrap hover:text-white/50 transition-colors">
										{item.label}
									</a>
								))}
								{legalItems.map((item) => (
									<a key={`desktop-${item.label}`} href={item.href} className="hover:text-white/50 transition-colors hidden md:inline">
										{item.label}
									</a>
								))}
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>
		</footer>
	);
}
