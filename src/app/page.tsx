import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<About />
				<Projects />
				<Services />
				<Testimonials />
				<CallToAction />
			</main>
			<Footer />
		</>
	);
}
