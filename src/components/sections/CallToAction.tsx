import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactButton from "@/components/ui/ContactButton";
import { COMPANY } from "@/lib/constants";

export default function CallToAction() {
	return (
		<section id="contact" className="py-6 md:py-8">
			<Container>
				<ScrollReveal scale>
					<div className="relative rounded-3xl overflow-hidden">
						{/* Background image */}
						<Image
							src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
							alt="Projet architectural"
							fill
							className="object-cover"
							sizes="100vw"
						/>

						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

						{/* Content */}
						<div className="relative z-10 py-20 md:py-28 px-6 md:px-12 text-center">
							<ScrollReveal delay={0.15} direction="none">
								<span className="inline-block text-[0.75rem] uppercase font-semibold tracking-widest text-accent mb-4">
									Démarrons votre projet
								</span>
							</ScrollReveal>
							<ScrollReveal delay={0.25}>
								<h2 className="text-[2rem] md:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-4 max-w-2xl mx-auto">
									Prêt à concrétiser vos idées ?
								</h2>
							</ScrollReveal>
							<ScrollReveal delay={0.35} direction="none">
								<p className="text-[1rem] md:text-[1.0625rem] text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
									Contactez-nous pour un devis gratuit et personnalisé. Notre équipe
									vous accompagne à chaque étape.
								</p>
							</ScrollReveal>
							<ScrollReveal delay={0.45}>
								<div className="flex flex-col sm:flex-row gap-3 justify-center">
									<ContactButton
										className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-foreground rounded-xl text-[0.9375rem] font-medium hover:bg-white/90 transition-colors cursor-pointer"
									>
										Contactez-nous
									</ContactButton>
									<ContactButton
										className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-[0.9375rem] font-medium hover:bg-white/20 transition-colors cursor-pointer"
									>
										Demander un devis
									</ContactButton>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</ScrollReveal>
			</Container>
		</section>
	);
}
