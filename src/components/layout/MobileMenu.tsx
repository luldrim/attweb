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
	const links = t.raw("links") as Array<{ label: string; href: string }>;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease }}
					className="fixed inset-0 z-50 bg-white"
				>
					<div className="flex h-full p-2.5 md:p-3 gap-2.5 md:gap-3">
						{/* Left — Image panel */}
						<motion.div
							initial={{ x: "-100%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "-100%", opacity: 0 }}
							transition={{ duration: 0.6, ease }}
							className="hidden md:block relative w-[45%] h-full rounded-[20px] md:rounded-[24px] overflow-hidden flex-shrink-0"
						>
							<motion.div
								initial={{ scale: 1.15 }}
								animate={{ scale: 1 }}
								exit={{ scale: 1.15 }}
								transition={{ duration: 0.8, ease }}
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
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 30 }}
								transition={{ duration: 0.5, delay: 0.3, ease }}
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
						<div className="flex-1 flex flex-col px-5 py-6 md:px-10 md:py-8 lg:px-14 overflow-y-auto">
							{/* Top bar: logo + close */}
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.4, delay: 0.15, ease }}
								className="flex items-center justify-between mb-16 md:mb-24"
							>
								<a href="#accueil" onClick={onClose} className="text-[1.375rem] tracking-tight text-foreground">
									<span className="font-semibold">Atout</span>
									<span className="font-light italic ml-0.5">Travaux</span>
								</a>
								<button
									onClick={onClose}
									className="p-1 text-foreground hover:text-muted transition-colors"
									aria-label={t("menuCloseLabel")}
								>
									<motion.svg
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.3, delay: 0.2, ease }}
										width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
									>
										<line x1="6" y1="6" x2="22" y2="22" />
										<line x1="22" y1="6" x2="6" y2="22" />
									</motion.svg>
								</button>
							</motion.div>

							{/* CONTACTEZ-NOUS */}
							<div className="flex-1">
								<motion.h2
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.6, delay: 0.2, ease }}
									className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-foreground tracking-tight leading-none mb-6"
								>
									{t("menuHeading")}
								</motion.h2>
								<motion.a
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5, delay: 0.3, ease }}
									href={`mailto:${tCompany("email")}`}
									className="inline-block text-[1.0625rem] md:text-[1.125rem] text-foreground underline underline-offset-4 decoration-1 hover:text-muted transition-colors"
								>
									{tCompany("email")}
								</motion.a>

								{/* Navigation */}
								<div className="mt-12 md:mt-16">
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.4, delay: 0.35, ease }}
										className="text-[0.9375rem] font-semibold text-foreground mb-4"
									>
										{t("menuNavLabel")}
									</motion.p>
									<div className="flex flex-wrap gap-x-8 gap-y-3">
										{links.map((link, i) =>
											link.href === "#contact" ? (
												<motion.div
													key={link.href}
													initial={{ opacity: 0, y: 15 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.4, delay: 0.35 + i * 0.05, ease }}
												>
													<Link
														href="/request-quote"
														onClick={onClose}
														className="text-[0.9375rem] text-foreground hover:text-muted transition-colors cursor-pointer"
													>
														{link.label}
													</Link>
												</motion.div>
											) : (
												<motion.a
													key={link.href}
													initial={{ opacity: 0, y: 15 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.4, delay: 0.35 + i * 0.05, ease }}
													href={link.href}
													onClick={onClose}
													className="text-[0.9375rem] text-foreground hover:text-muted transition-colors cursor-pointer"
												>
													{link.label}
												</motion.a>
											)
										)}
									</div>
								</div>
							</div>

							{/* Bottom copyright */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.6, ease }}
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
