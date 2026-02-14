"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ContactButton from "@/components/ui/ContactButton";

function AccordionItem({
	question,
	answer,
	isOpen,
	onToggle,
	index,
	animate,
}: {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
	index: number;
	animate: boolean;
}) {
	return (
		<div
			className="bg-white rounded-md border border-black/10 overflow-hidden"
			style={
				animate
					? {
							animation: `faq-fade-in 0.5s ${index * 0.08}s both cubic-bezier(0.25, 0.1, 0.25, 1)`,
						}
					: { opacity: 0 }
			}
		>
			<button
				onClick={onToggle}
				className="flex items-center justify-between w-full px-4 py-5 text-left cursor-pointer"
			>
				<span className="text-[0.9375rem] md:text-[1rem] font-medium text-foreground leading-snug pr-4">
					{question}
				</span>
				<motion.svg
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
					className="w-4 h-4 shrink-0 text-foreground/60"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
				</motion.svg>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
						className="overflow-hidden"
					>
						<div className="px-4 pb-5">
							<p className="text-[0.875rem] text-foreground/70 leading-relaxed">
								{answer}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default function FAQ() {
	const t = useTranslations("faq");
	const items = t.raw("items") as Array<{ question: string; answer: string }>;
	const [openIndex, setOpenIndex] = useState<number | null>(0);
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

	return (
		<section className="py-24 md:py-32">
			<Container>
				{/* Header: title left, subtitle right */}
				<div
					style={
						isInView
							? { animation: "faq-fade-in 0.6s both cubic-bezier(0.25, 0.1, 0.25, 1)" }
							: { opacity: 0 }
					}
				>
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-12 md:mb-14">
						<h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-foreground leading-[1.1] tracking-tight">
							{t("heading")}
						</h2>
						<p className="text-[0.9375rem] text-foreground/70 leading-relaxed md:text-right max-w-[380px]">
							{t("subheading")}
						</p>
					</div>
				</div>

				{/* Two-column layout: accordion left, image right */}
				<div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
					{/* Accordion */}
					<div className="flex flex-col gap-3">
						{items.map((item, i) => (
							<AccordionItem
								key={i}
								question={item.question}
								answer={item.answer}
								isOpen={openIndex === i}
								onToggle={() => setOpenIndex(openIndex === i ? null : i)}
								index={i}
								animate={isInView}
							/>
						))}
					</div>

					{/* Image with contact overlay */}
					<div
						className="hidden lg:block"
						style={
							isInView
								? { animation: "faq-fade-in 0.6s 0.2s both cubic-bezier(0.25, 0.1, 0.25, 1)" }
								: { opacity: 0 }
						}
					>
						<div className="relative rounded-md overflow-hidden h-full min-h-[500px]">
							<Image
								src="https://framerusercontent.com/images/oDC12RKl3RMQUdu2JGGhxj544M.jpeg"
								alt="Équipe Atout Travaux en réunion"
								fill
								className="object-cover"
								sizes="(min-width: 1200px) 50vw, 100vw"
							/>
							{/* Blurred glass overlay */}
							<div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/40 backdrop-blur-xl p-5 md:p-6">
								<h5 className="text-white text-[1.125rem] font-medium mb-3">
									{t("imageCtaHeading")}
								</h5>
								<ContactButton variant="white" size="sm">
									{t("imageCtaButton")}
								</ContactButton>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
