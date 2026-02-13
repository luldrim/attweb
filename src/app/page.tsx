import ContactModal from "@/components/ui/ContactModal";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import BeforeAfter from "@/components/sections/BeforeAfter";
import FAQ from "@/components/sections/FAQ";
import CTAFooter from "@/components/sections/CTAFooter";

export default function Home() {
	return (
		<>
			<SmoothScroll />
			<ContactModal />
			<Header />
			<main className="relative z-10 bg-background">
				<Hero />
				<About />
				<Projects />
				<Services />
				<Testimonials />
				<BeforeAfter />
				<FAQ />
			</main>
			{/* Spacer — creates scroll room for footer reveal */}
			<div id="contact" data-header-dark className="h-dvh" />
			<CTAFooter />
		</>
	);
}
