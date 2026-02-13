import Image from "next/image";
import ContactButton from "@/components/ui/ContactButton";
import { COMPANY, FOOTER_LEGAL } from "@/lib/constants";

export default function CTAFooter() {
	return (
		<footer id="contact" className="sticky bottom-0 h-dvh z-0">
			<div className="relative w-full h-full">
				{/* Background image */}
				<Image
					src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
					alt="Projet architectural"
					fill
					className="object-cover"
					sizes="100vw"
				/>

				{/* Dark overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

				{/* Content */}
				<div className="absolute inset-0 flex flex-col pt-20 md:pt-0">
					{/* CTA — centered */}
					<div className="flex-1 flex flex-col items-center justify-center text-center px-5">
						<span className="inline-block text-[0.75rem] uppercase font-semibold tracking-widest text-accent mb-3 md:mb-4">
							Démarrons votre projet
						</span>
						<h2 className="text-[1.75rem] md:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-3 md:mb-4 max-w-2xl">
							Prêt à concrétiser vos idées ?
						</h2>
						<p className="text-[0.9375rem] md:text-[1.0625rem] text-white/60 max-w-lg mb-7 md:mb-10 leading-relaxed">
							Contactez-nous pour un devis gratuit et personnalisé. Notre équipe
							vous accompagne à chaque étape.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<ContactButton variant="white" size="lg">
								Contactez-nous
							</ContactButton>
							<ContactButton variant="glass" size="lg">
								Demander un devis
							</ContactButton>
						</div>
					</div>

					{/* Footer info — blurred glass at bottom */}
					<div className="bg-black/20 backdrop-blur-md border-t border-white/10">
						<div className="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14">
							<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-8 py-6 md:py-10">
								{/* Company info */}
								<div className="shrink-0">
									<div className="flex items-baseline gap-1.5 mb-1.5">
										<span className="text-[1rem] md:text-[1.25rem] font-bold text-white">Atout</span>
										<span className="text-[1rem] md:text-[1.25rem] font-light text-white">Travaux</span>
									</div>
									<p className="text-[0.6875rem] md:text-[0.75rem] text-white/40 leading-relaxed">
										{COMPANY.tagline}
									</p>
								</div>

								{/* Contact + Legal — 2 cols on mobile, separate on desktop */}
								<div className="grid grid-cols-2 md:contents gap-4">
									{/* Contact */}
									<div>
										<h4 className="text-[0.75rem] md:text-[0.8125rem] font-semibold text-white mb-2 md:mb-3">Contact</h4>
										<ul className="space-y-1.5 text-[0.6875rem] md:text-[0.75rem] text-white/40">
											<li>
												<a href={COMPANY.phoneHref} className="hover:text-white/70 transition-colors">
													{COMPANY.phone}
												</a>
											</li>
											<li>
												<a href={`mailto:${COMPANY.email}`} className="hover:text-white/70 transition-colors">
													{COMPANY.email}
												</a>
											</li>
											<li className="hidden md:list-item">{COMPANY.address}</li>
										</ul>
									</div>

									{/* Legal */}
									<div>
										<h4 className="text-[0.75rem] md:text-[0.8125rem] font-semibold text-white mb-2 md:mb-3">Informations</h4>
										<ul className="space-y-1.5">
											{FOOTER_LEGAL.map((item) => (
												<li key={item.label}>
													<a
														href={item.href}
														className="text-[0.6875rem] md:text-[0.75rem] text-white/40 hover:text-white/70 transition-colors"
													>
														{item.label}
													</a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>

							{/* Copyright */}
							<div className="py-4 border-t border-white/10 flex justify-between items-center text-[0.65rem] md:text-[0.7rem] text-white/25">
								<span>© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</span>
								<div className="flex gap-4">
									<a href="#" className="hover:text-white/50 transition-colors hidden md:inline">Mentions légales</a>
									<a href="#" className="hover:text-white/50 transition-colors hidden md:inline">Confidentialité</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
