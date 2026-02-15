"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
	type ConsentState,
	getStoredConsent,
	setConsent,
	hasUserResponded,
} from "@/lib/consent";

const ease = [0.32, 0.72, 0, 1] as const;

function Toggle({
	checked,
	disabled,
	onChange,
}: {
	checked: boolean;
	disabled?: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => !disabled && onChange(!checked)}
			className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
				disabled
					? "bg-foreground/20 cursor-not-allowed"
					: checked
						? "bg-accent cursor-pointer"
						: "bg-foreground/15 cursor-pointer"
			}`}
		>
			<span
				className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-0.5 ${
					checked ? "translate-x-[22px]" : "translate-x-0.5"
				}`}
			/>
		</button>
	);
}

export default function CookieBanner() {
	const t = useTranslations("cookieConsent");
	const [visible, setVisible] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [analytics, setAnalytics] = useState(false);
	const [marketing, setMarketing] = useState(false);

	useEffect(() => {
		if (!hasUserResponded()) {
			const timer = setTimeout(() => setVisible(true), 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	useEffect(() => {
		const handleOpen = () => {
			const stored = getStoredConsent();
			if (stored) {
				setAnalytics(stored.analytics);
				setMarketing(stored.marketing);
			} else {
				setAnalytics(false);
				setMarketing(false);
			}
			setShowDetails(false);
			setVisible(true);
		};
		window.addEventListener("open-cookie-banner", handleOpen);
		return () => window.removeEventListener("open-cookie-banner", handleOpen);
	}, []);

	const save = useCallback(
		(state: ConsentState) => {
			setConsent(state);
			setVisible(false);
			setShowDetails(false);
		},
		[],
	);

	const acceptAll = useCallback(
		() => save({ necessary: true, analytics: true, marketing: true }),
		[save],
	);

	const rejectAll = useCallback(
		() => save({ necessary: true, analytics: false, marketing: false }),
		[save],
	);

	const saveCustom = useCallback(
		() => save({ necessary: true, analytics, marketing }),
		[save, analytics, marketing],
	);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ y: "100%", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "100%", opacity: 0 }}
					transition={{ duration: 0.45, ease }}
					className="fixed bottom-0 inset-x-0 z-50 p-3 md:p-5"
				>
					<div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
						{/* Header */}
						<div className="px-5 pt-5 pb-0 md:px-6 md:pt-6 flex items-start justify-between gap-3">
							<div>
								<h3 className="text-[0.9375rem] md:text-[1rem] font-semibold text-foreground leading-tight">
									{t("heading")}
								</h3>
								<p className="text-[0.8125rem] text-muted mt-1.5 leading-relaxed">
									{t("description")}
								</p>
							</div>
							<button
								onClick={rejectAll}
								className="shrink-0 p-1 text-muted hover:text-foreground transition-colors cursor-pointer"
								aria-label={t("closeLabel")}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								>
									<line x1="6" y1="6" x2="18" y2="18" />
									<line x1="18" y1="6" x2="6" y2="18" />
								</svg>
							</button>
						</div>

						{/* Detail toggles */}
						<AnimatePresence>
							{showDetails && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease }}
									className="overflow-hidden"
								>
									<div className="px-5 pt-4 md:px-6 space-y-3">
										{/* Necessary */}
										<div className="flex items-center justify-between py-2">
											<div>
												<p className="text-[0.8125rem] font-medium text-foreground">
													{t("categories.necessary.label")}
												</p>
												<p className="text-[0.75rem] text-muted">
													{t("categories.necessary.description")}
												</p>
											</div>
											<Toggle checked disabled onChange={() => {}} />
										</div>
										{/* Analytics */}
										<div className="flex items-center justify-between py-2">
											<div>
												<p className="text-[0.8125rem] font-medium text-foreground">
													{t("categories.analytics.label")}
												</p>
												<p className="text-[0.75rem] text-muted">
													{t("categories.analytics.description")}
												</p>
											</div>
											<Toggle
												checked={analytics}
												onChange={setAnalytics}
											/>
										</div>
										{/* Marketing */}
										<div className="flex items-center justify-between py-2">
											<div>
												<p className="text-[0.8125rem] font-medium text-foreground">
													{t("categories.marketing.label")}
												</p>
												<p className="text-[0.75rem] text-muted">
													{t("categories.marketing.description")}
												</p>
											</div>
											<Toggle
												checked={marketing}
												onChange={setMarketing}
											/>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Buttons */}
						<div className="px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row gap-2.5">
							{showDetails ? (
								<>
									<button
										onClick={rejectAll}
										className="flex-1 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium border border-foreground/15 text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
									>
										{t("rejectAll")}
									</button>
									<button
										onClick={saveCustom}
										className="flex-1 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium bg-foreground text-white hover:bg-foreground/90 transition-colors cursor-pointer"
									>
										{t("savePreferences")}
									</button>
								</>
							) : (
								<>
									<button
										onClick={rejectAll}
										className="flex-1 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium border border-foreground/15 text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
									>
										{t("rejectAll")}
									</button>
									<button
										onClick={() => setShowDetails(true)}
										className="flex-1 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium border border-foreground/15 text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
									>
										{t("customize")}
									</button>
									<button
										onClick={acceptAll}
										className="flex-1 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium bg-foreground text-white hover:bg-foreground/90 transition-colors cursor-pointer"
									>
										{t("acceptAll")}
									</button>
								</>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
