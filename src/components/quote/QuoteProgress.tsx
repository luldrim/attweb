"use client";

import { motion } from "framer-motion";
import { useQuote } from "./quote-context";
import { QUOTE_STEPS } from "@/lib/constants";

export default function QuoteProgress() {
	const { state } = useQuote();
	const { currentStep } = state;

	if (currentStep >= 3) return null;

	return (
		<div className="flex items-center gap-2 px-6 md:px-10 pb-4">
			{QUOTE_STEPS.map((_, i) => (
				<div
					key={i}
					className="relative h-[3px] rounded-full bg-black/8 overflow-hidden"
					style={{ flex: i === currentStep ? 3 : 1 }}
				>
					<motion.div
						className="absolute inset-y-0 left-0 rounded-full"
						initial={false}
						animate={{
							width: i < currentStep ? "100%" : i === currentStep ? "100%" : "0%",
							backgroundColor:
								i <= currentStep
									? "var(--foreground)"
									: "transparent",
						}}
						transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
					/>
				</div>
			))}
		</div>
	);
}
