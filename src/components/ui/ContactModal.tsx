"use client";

import { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/lib/constants";

export function openContactModal() {
	window.dispatchEvent(new Event("open-contact"));
}

const ease = [0.32, 0.72, 0, 1] as const;

export default function ContactModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [sent, setSent] = useState(false);

	useEffect(() => {
		const open = () => setIsOpen(true);
		window.addEventListener("open-contact", open);
		return () => window.removeEventListener("open-contact", open);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	function handleClose() {
		setIsOpen(false);
		setTimeout(() => setSent(false), 300);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSent(true);
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5"
					onClick={handleClose}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/60" />

					{/* Panel — almost fullscreen */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.45, ease }}
						onClick={(e) => e.stopPropagation()}
						className="relative bg-white rounded-2xl w-[calc(100vw-24px)] md:w-[calc(100vw-40px)] h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
					>
						{/* Close button */}
						<motion.button
							initial={{ opacity: 0, rotate: -90 }}
							animate={{ opacity: 1, rotate: 0 }}
							transition={{ duration: 0.3, delay: 0.25, ease }}
							onClick={handleClose}
							className="absolute top-5 right-5 z-10 p-1.5 text-foreground hover:text-muted transition-colors cursor-pointer"
							aria-label="Fermer"
						>
							<svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
								<line x1="6" y1="6" x2="22" y2="22" />
								<line x1="22" y1="6" x2="6" y2="22" />
							</svg>
						</motion.button>

						{/* Left — Title + Image + Infos */}
						<div className="flex flex-col lg:w-1/2 p-8 md:p-10 lg:p-12 overflow-y-auto">
							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1, ease }}
								className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-light text-foreground leading-[1.05] tracking-tight"
							>
								Contactez-nous
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.18, ease }}
								className="text-[0.9375rem] text-muted mt-3 max-w-[360px]"
							>
								Parlons de votre projet — nous sommes disponibles pour vous accompagner.
							</motion.p>

							{/* Image — between title and infos on desktop */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3, ease }}
								className="relative rounded-xl overflow-hidden mt-8 aspect-[3/2] shrink-0 hidden lg:block"
							>
								<Image
									src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
									alt="Projet Atout Travaux"
									fill
									className="object-cover"
									sizes="500px"
								/>
							</motion.div>

							{/* Contact details */}
							<motion.div
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4, ease }}
								className="grid grid-cols-2 gap-x-10 gap-y-6 mt-auto pt-8"
							>
								<div>
									<h5 className="text-[0.8125rem] font-semibold text-foreground mb-0.5">
										Appelez-nous
									</h5>
									<a href={COMPANY.phoneHref} className="text-[0.8125rem] text-muted hover:text-foreground transition-colors">
										{COMPANY.phone}
									</a>
								</div>
								<div>
									<h5 className="text-[0.8125rem] font-semibold text-foreground mb-0.5">
										Email
									</h5>
									<a href={`mailto:${COMPANY.email}`} className="text-[0.8125rem] text-muted hover:text-foreground transition-colors underline underline-offset-2 decoration-1">
										{COMPANY.email}
									</a>
								</div>
								<div>
									<h5 className="text-[0.8125rem] font-semibold text-foreground mb-0.5">
										Adresse
									</h5>
									<p className="text-[0.8125rem] text-muted leading-relaxed">
										{COMPANY.address}
									</p>
								</div>
								<div>
									<h5 className="text-[0.8125rem] font-semibold text-foreground mb-0.5">
										Zone
									</h5>
									<p className="text-[0.8125rem] text-muted">
										{COMPANY.region}
									</p>
								</div>
							</motion.div>
						</div>

						{/* Right — Form */}
						<div className="lg:w-1/2 p-8 md:p-10 lg:p-12 bg-background/50 overflow-y-auto flex flex-col">
							{sent ? (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, ease }}
									className="flex-1 flex flex-col items-center justify-center text-center"
								>
									<div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
										<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent">
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</div>
									<h4 className="text-[1.25rem] font-semibold text-foreground mb-2">
										Message envoyé
									</h4>
									<p className="text-[0.9375rem] text-muted">
										Nous reviendrons vers vous sous 24h.
									</p>
								</motion.div>
							) : (
								<motion.form
									initial={{ opacity: 0, y: 25 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2, ease }}
									onSubmit={handleSubmit}
									className="flex flex-col gap-5 flex-1"
								>
									<div>
										<label htmlFor="contact-name" className="block text-[0.875rem] font-medium text-foreground mb-2">
											Nom complet
										</label>
										<input
											id="contact-name"
											name="name"
											type="text"
											required
											className="w-full px-4 py-3 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors"
											placeholder="Jean Dupont"
										/>
									</div>
									<div>
										<label htmlFor="contact-email" className="block text-[0.875rem] font-medium text-foreground mb-2">
											Email
										</label>
										<input
											id="contact-email"
											name="email"
											type="email"
											required
											className="w-full px-4 py-3 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors"
											placeholder="jean@exemple.fr"
										/>
									</div>
									<div>
										<label htmlFor="contact-phone" className="block text-[0.875rem] font-medium text-foreground mb-2">
											Téléphone
										</label>
										<input
											id="contact-phone"
											name="phone"
											type="tel"
											className="w-full px-4 py-3 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors"
											placeholder="06 00 00 00 00"
										/>
									</div>
									<div className="flex-1 flex flex-col">
										<label htmlFor="contact-message" className="block text-[0.875rem] font-medium text-foreground mb-2">
											Message
										</label>
										<textarea
											id="contact-message"
											name="message"
											rows={4}
											required
											className="w-full flex-1 min-h-[120px] px-4 py-3 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors resize-none"
											placeholder="Décrivez votre projet..."
										/>
									</div>
									<button
										type="submit"
										className="group w-full px-6 py-3.5 bg-foreground text-white rounded-full text-[0.9375rem] font-medium overflow-hidden hover:bg-foreground/90 transition-colors duration-200 cursor-pointer mt-auto"
									>
										<span className="relative block overflow-hidden">
											<span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
												Envoyer
											</span>
											<span className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full" aria-hidden="true">
												Envoyer
											</span>
										</span>
									</button>
								</motion.form>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
