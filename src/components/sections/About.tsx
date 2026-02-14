import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import ContactButton from "@/components/ui/ContactButton";
import { getTranslations, getMessages } from "next-intl/server";

function DotsIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-foreground/40">
			<circle cx="10" cy="3" r="2" />
			<circle cx="10" cy="17" r="2" />
			<circle cx="3" cy="10" r="2" />
			<circle cx="17" cy="10" r="2" />
		</svg>
	);
}

function Stars({ count }: { count: number }) {
	return (
		<div className="flex gap-1">
			{Array.from({ length: count }).map((_, i) => (
				<svg
					key={i}
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="text-accent"
				>
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			))}
		</div>
	);
}

function FeatureCard({ number, title, description }: { number: string; title: string; description: string }) {
	return (
		<div className="bg-white rounded-2xl p-6 flex flex-col h-full">
			{/* Top: number + dots */}
			<div className="flex items-center justify-between pb-4 border-b border-[#f7f7f7] mb-auto">
				<span className="text-[0.875rem] text-foreground">{number}</span>
				<DotsIcon />
			</div>
			{/* Title */}
			<h5 className="text-[1.125rem] md:text-[1.25rem] font-semibold text-foreground mt-5 mb-4">
				{title}
			</h5>
			{/* Description */}
			<p className="text-[0.875rem] text-foreground/70 leading-relaxed">
				{description}
			</p>
		</div>
	);
}

export default async function About() {
	const t = await getTranslations("about");
	const tTestimonials = await getTranslations("testimonials");
	const testimonials = tTestimonials.raw("items") as Array<{ name: string; role: string; quote: string; rating: number }>;
	const testimonial = testimonials[0];
	const messages = await getMessages();
	const statsArr = messages.stats as Array<{ value: string; label: string }>;
	const featuresArr = messages.features as Array<{ number: string; title: string; description: string }>;

	return (
		<section id="apropos" className="py-20 md:py-28">
			<Container>
				{/* Top: heading left + paragraph/CTA right */}
				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 md:mb-16">
					<ScrollReveal>
						<h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-foreground leading-[1.1] tracking-tight max-w-[700px]">
							{t("heading")}
						</h2>
					</ScrollReveal>
					<ScrollReveal delay={0.15} className="lg:text-right lg:max-w-[340px] flex-shrink-0">
						<p className="text-[0.9375rem] text-foreground leading-relaxed mb-5">
							{t("subheading")}
						</p>
						<ContactButton variant="secondary">
							{t("ctaButton")}
						</ContactButton>
					</ScrollReveal>
				</div>

				{/* Bento grid: 4 cols × 2 rows on desktop */}
				<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12 md:mb-16" stagger={0.08}>
					{/* Testimonial card — spans 2 rows */}
					<StaggerItem className="lg:row-span-2">
						<div className="bg-white rounded-2xl p-6 md:p-7 flex flex-col h-full">
							<Stars count={testimonial.rating} />
							<blockquote className="text-[0.9375rem] md:text-[1rem] text-foreground leading-relaxed mt-5 flex-1">
								{testimonial.quote}
							</blockquote>
							<div className="flex items-center gap-3 mt-6">
								<div className="w-10 h-10 rounded-full overflow-hidden bg-surface">
									<Image
										src="https://framerusercontent.com/images/MbFP8ZlwicRkcUZvtZRfHIUff8.png"
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
									<div className="text-[0.8125rem] text-foreground/60">
										{testimonial.role}
									</div>
								</div>
							</div>
						</div>
					</StaggerItem>

					{/* Image 1 — row 1, col 2 */}
					<StaggerItem>
						<div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
							<Image
								src="https://framerusercontent.com/images/ZokFTvIUZIDAmlsADCohr7aSmA.jpeg"
								alt="Intérieur design"
								fill
								className="object-cover"
								sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 25vw"
							/>
						</div>
					</StaggerItem>

					{/* Feature 01 — row 1, col 3 */}
					<StaggerItem>
						<FeatureCard {...featuresArr[0]} />
					</StaggerItem>

					{/* Image 2 — row 1, col 4 */}
					<StaggerItem>
						<div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
							<Image
								src="https://framerusercontent.com/images/2Y0ya9oktSQl8lubjb0qzVo77Ts.jpeg"
								alt="Mobilier design"
								fill
								className="object-cover"
								sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 25vw"
							/>
						</div>
					</StaggerItem>

					{/* Feature 02 — row 2, col 2 */}
					<StaggerItem>
						<FeatureCard {...featuresArr[1]} />
					</StaggerItem>

					{/* Image 3 — row 2, col 3 */}
					<StaggerItem>
						<div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
							<Image
								src="https://framerusercontent.com/images/vqcV12mC7DZwiVH2m9j6Ud0zf8.jpeg"
								alt="Projet paysager"
								fill
								className="object-cover"
								sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 25vw"
							/>
						</div>
					</StaggerItem>

					{/* Feature 03 — row 2, col 4 */}
					<StaggerItem>
						<FeatureCard {...featuresArr[2]} />
					</StaggerItem>
				</StaggerContainer>

				{/* Stats row */}
				<StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" stagger={0.1}>
					{statsArr.map((stat) => (
						<StaggerItem key={stat.label}>
							<div className="text-[2.5rem] md:text-[3rem] font-light text-foreground leading-none tracking-tight">
								{stat.value}
							</div>
							<div className="text-[0.875rem] text-foreground/60 mt-2">
								{stat.label}
							</div>
						</StaggerItem>
					))}
				</StaggerContainer>
			</Container>
		</section>
	);
}
