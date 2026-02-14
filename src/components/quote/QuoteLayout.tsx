"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QuoteProvider, useQuote } from "./quote-context";
import QuoteCarousel from "./QuoteCarousel";
import QuoteProgress from "./QuoteProgress";
import QuoteNavigation from "./QuoteNavigation";
import StepIdentity from "./steps/StepIdentity";
import StepProject from "./steps/StepProject";
import StepDetails from "./steps/StepDetails";
import StepSuccess from "./steps/StepSuccess";
import { QUOTE_STEPS } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const stepVariants = {
	enter: (direction: number) => ({
		y: direction > 0 ? 20 : -20,
		opacity: 0,
	}),
	center: {
		y: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		y: direction > 0 ? -20 : 20,
		opacity: 0,
	}),
};

function QuoteForm() {
	const { state } = useQuote();
	const { currentStep, direction } = state;
	const isSuccess = currentStep >= 3;

	return (
		<div className="flex flex-col w-full lg:w-1/2 min-h-0">
			{/* Header */}
			<div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
				<Link
					href="/"
					className="text-[1.375rem] tracking-tight text-foreground"
				>
					<span className="font-semibold">Atout</span>
					<span className="font-light italic ml-0.5">Travaux</span>
				</Link>

				{!isSuccess && (
					<span className="text-[0.8125rem] text-muted">
						Étape {currentStep + 1} sur {QUOTE_STEPS.length}
					</span>
				)}

				<Link
					href="/"
					className="p-1.5 text-foreground/40 hover:text-foreground transition-colors"
					aria-label="Fermer"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 28 28"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					>
						<line x1="6" y1="6" x2="22" y2="22" />
						<line x1="22" y1="6" x2="6" y2="22" />
					</svg>
				</Link>
			</div>

			<QuoteProgress />

			{/* Steps */}
			<div className="flex-1 overflow-y-auto px-6 md:px-10 py-4">
				<AnimatePresence mode="wait" custom={direction}>
					<motion.div
						key={currentStep}
						custom={direction}
						variants={stepVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3, ease }}
						className={isSuccess ? "flex flex-col flex-1 min-h-[60vh]" : ""}
					>
						{currentStep === 0 && <StepIdentity />}
						{currentStep === 1 && <StepProject />}
						{currentStep === 2 && <StepDetails />}
						{currentStep === 3 && <StepSuccess />}
					</motion.div>
				</AnimatePresence>
			</div>

			<QuoteNavigation />
		</div>
	);
}

export default function QuoteLayout() {
	return (
		<QuoteProvider>
			<div className="flex h-dvh bg-background">
				<QuoteCarousel />
				<QuoteForm />
			</div>
		</QuoteProvider>
	);
}
