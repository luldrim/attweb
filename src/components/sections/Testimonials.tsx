import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { TESTIMONIAL_AVATARS } from "@/lib/constants";

export default async function Testimonials() {
	const t = await getTranslations("testimonials");
	const items = t.raw("items") as Array<{ name: string; role: string; quote: string; rating: number }>;

	return (
		<section id="temoignages" className="py-24 md:py-32">
			<Container>
				<ScrollReveal>
					<div className="flex flex-col items-start mb-12 md:mb-14">
						<span className="inline-block text-[0.75rem] uppercase font-semibold tracking-widest text-accent mb-4">
							{t("label")}
						</span>
						<h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-foreground leading-[1.1] tracking-tight">
							{t("heading")}
						</h2>
						<p className="text-[0.9375rem] text-foreground/70 leading-relaxed mt-4 max-w-[480px]">
							{t("subheading")}
						</p>
					</div>
				</ScrollReveal>

				<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" stagger={0.12}>
					{items.map((testimonial, i) => (
						<StaggerItem key={testimonial.name}>
							<div className="bg-white rounded-2xl p-7 md:p-8 flex flex-col h-full">
								<blockquote className="text-[0.9375rem] text-foreground/80 leading-relaxed flex-1 mb-6">
									&ldquo;{testimonial.quote}&rdquo;
								</blockquote>
								<div className="flex items-center gap-3 pt-5 border-t border-border">
									<div className="w-10 h-10 rounded-full overflow-hidden bg-surface">
										<Image
											src={TESTIMONIAL_AVATARS[i]}
											alt={testimonial.name}
											width={40}
											height={40}
											className="object-cover w-full h-full"
										/>
									</div>
									<div>
										<div className="text-[0.875rem] font-semibold text-foreground">
											{testimonial.name}
										</div>
										<div className="text-[0.75rem] text-muted">
											{testimonial.role}
										</div>
									</div>
								</div>
							</div>
						</StaggerItem>
					))}
				</StaggerContainer>
			</Container>
		</section>
	);
}
