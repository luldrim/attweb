"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useQuote } from "./quote-context";

function Spinner() {
	return (
		<svg
			className="animate-spin h-5 w-5 text-white"
			viewBox="0 0 24 24"
			fill="none"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="3"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			/>
		</svg>
	);
}

export default function QuoteNavigation() {
	const t = useTranslations("quote");
	const { state, dispatch, submitCurrentStep } = useQuote();
	const { currentStep, loading } = state;

	if (currentStep >= 3) return null;

	const isLastStep = currentStep === 2;
	const label = isLastStep ? t("submitButton") : t("continueButton");

	return (
		<div className="sticky bottom-0 bg-background border-t border-black/5 px-6 md:px-10 py-4 flex items-center justify-between gap-4">
			{currentStep > 0 ? (
				<button
					type="button"
					onClick={() => dispatch({ type: "PREV_STEP" })}
					disabled={loading}
					className="px-6 py-3 text-[0.9375rem] font-medium text-foreground hover:text-foreground/70 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
				>
					{t("backButton")}
				</button>
			) : (
				<div />
			)}

			<motion.button
				type="button"
				whileTap={loading ? {} : { scale: 0.98 }}
				onClick={submitCurrentStep}
				disabled={loading}
				className="group px-8 py-3 bg-foreground text-white rounded-full text-[0.9375rem] font-medium overflow-hidden hover:bg-foreground/90 transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
			>
				{loading ? (
					<Spinner />
				) : (
					<span className="relative block overflow-hidden">
						<span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
							{label}
						</span>
						<span
							className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
							aria-hidden="true"
						>
							{label}
						</span>
					</span>
				)}
			</motion.button>
		</div>
	);
}
