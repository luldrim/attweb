import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { COMPANY, FOOTER_SERVICES, FOOTER_LEGAL } from "@/lib/constants";

export default function Footer() {
	return (
		<footer className="bg-foreground text-white pt-16 md:pt-20 pb-8">
			<Container>
				{/* Grid */}
				<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-white/10" stagger={0.1}>
					{/* Company info */}
					<StaggerItem className="md:col-span-2 lg:col-span-1">
						<div className="flex items-baseline gap-2 mb-4">
							<span className="text-[1.5rem] font-bold">Atout</span>
							<span className="text-[1.5rem] font-light">Travaux</span>
						</div>
						<p className="text-[0.8125rem] text-white/50 leading-relaxed">
							{COMPANY.tagline}
							<br /><br />
							Votre partenaire de confiance pour tous vos projets de construction et rénovation en {COMPANY.region}.
						</p>
					</StaggerItem>

					{/* Services */}
					<StaggerItem>
						<h4 className="text-[0.875rem] font-semibold mb-5">Services</h4>
						<ul className="space-y-2.5">
							{FOOTER_SERVICES.map((service) => (
								<li key={service}>
									<a
										href="#services"
										className="text-[0.8125rem] text-white/50 hover:text-white transition-colors"
									>
										{service}
									</a>
								</li>
							))}
						</ul>
					</StaggerItem>

					{/* Contact */}
					<StaggerItem>
						<h4 className="text-[0.875rem] font-semibold mb-5">Contact</h4>
						<ul className="space-y-2.5 text-[0.8125rem] text-white/50">
							<li>
								<a href={COMPANY.phoneHref} className="hover:text-white transition-colors">
									{COMPANY.phone}
								</a>
							</li>
							<li>
								<a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
									{COMPANY.email}
								</a>
							</li>
							<li>{COMPANY.address}</li>
						</ul>
					</StaggerItem>

					{/* Legal */}
					<StaggerItem>
						<h4 className="text-[0.875rem] font-semibold mb-5">Informations</h4>
						<ul className="space-y-2.5">
							{FOOTER_LEGAL.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										className="text-[0.8125rem] text-white/50 hover:text-white transition-colors"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</StaggerItem>
				</StaggerContainer>

				{/* Copyright bar */}
				<ScrollReveal direction="none" delay={0.2}>
					<div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/30">
						<span>© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</span>
						<div className="flex gap-6">
							<a href="#" className="hover:text-white/60 transition-colors">Mentions légales</a>
							<a href="#" className="hover:text-white/60 transition-colors">Confidentialité</a>
						</div>
					</div>
				</ScrollReveal>
			</Container>
		</footer>
	);
}
