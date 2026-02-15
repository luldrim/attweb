"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ease = [0.32, 0.72, 0, 1] as const;

type MobileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
	const t = useTranslations("nav");
	const tCompany = useTranslations("company");

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease }}
					className="fixed inset-0 z-50 bg-white"
				>
					<div className="flex h-full p-2.5 md:p-3 gap-2.5 md:gap-3">
						{/* Left — Image panel (clip-path reveal) */}
						<motion.div
							initial={{ clipPath: "inset(0 100% 0 0)" }}
							animate={{ clipPath: "inset(0 0% 0 0)" }}
							exit={{ clipPath: "inset(0 100% 0 0)" }}
							transition={{ duration: 0.8, ease }}
							className="hidden md:block relative w-[45%] h-full rounded-[20px] md:rounded-[24px] overflow-hidden flex-shrink-0"
						>
							<motion.div
								initial={{ scale: 1.08 }}
								animate={{ scale: 1 }}
								exit={{ scale: 1.08 }}
								transition={{ duration: 1, ease }}
								className="absolute inset-0"
							>
								<Image
									src="https://framerusercontent.com/images/dKG94C76HSIkmG9hqW8PIAgIhHg.jpg?scale-down-to=2048"
									alt="Intérieur design"
									fill
									className="object-cover"
									sizes="45vw"
								/>
							</motion.div>

							{/* Bottom overlay text */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: 0.4, ease }}
								className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
							>
								<div className="flex items-center gap-2 mb-3 text-white/70">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>
								</div>
								<p className="text-[1.25rem] md:text-[1.375rem] text-white font-light leading-snug">
									{t("menuImageCaption")}
								</p>
								<span className="inline-block mt-3 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-[0.8125rem] text-white">
									{t("menuImageBadge")}
								</span>
							</motion.div>
						</motion.div>

						{/* Right — Content panel */}
						<div className="flex-1 flex flex-col px-5 pt-20 pb-6 md:px-10 md:pt-24 md:pb-8 lg:px-14 overflow-y-auto">
							{/* Contact */}
							<div className="flex-1">
								<motion.h2
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.5, delay: 0.15, ease }}
									className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-foreground tracking-tight leading-none mb-8 md:mb-10"
								>
									{t("menuHeading")}
								</motion.h2>

								{/* Email */}
								<motion.a
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.4, delay: 0.2, ease }}
									href={`mailto:${tCompany("email")}`}
									className="flex items-center gap-3 text-[1.0625rem] md:text-[1.125rem] text-foreground hover:text-muted transition-colors group"
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-muted group-hover:text-foreground transition-colors">
										<rect x="2" y="4" width="20" height="16" rx="2" />
										<path d="M22 7l-10 6L2 7" />
									</svg>
									{tCompany("email")}
								</motion.a>

								{/* Phone */}
								<motion.a
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.4, delay: 0.25, ease }}
									href={tCompany("phoneHref")}
									className="flex items-center gap-3 mt-4 text-[1.0625rem] md:text-[1.125rem] text-foreground hover:text-muted transition-colors group"
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-muted group-hover:text-foreground transition-colors">
										<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
									</svg>
									{tCompany("phone")}
								</motion.a>

								{/* Quote button */}
								<motion.div
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.4, delay: 0.32, ease }}
									className="mt-8 md:mt-10"
								>
									<Link
										href="/request-quote"
										onClick={onClose}
										className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white text-[0.9375rem] font-medium rounded-full hover:bg-foreground/85 transition-colors"
									>
										{t("menuQuoteButton")}
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									</Link>
								</motion.div>
							</div>

							{/* Bottom copyright */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.4, ease }}
								className="pt-8 mt-auto"
							>
								<p className="text-[0.8125rem] text-muted">
									&copy; {new Date().getFullYear()} {tCompany("name")}. Tous droits réservés
								</p>
							</motion.div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
