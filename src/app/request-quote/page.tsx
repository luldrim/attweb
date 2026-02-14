import type { Metadata } from "next";
import QuoteLayout from "@/components/quote/QuoteLayout";

export const metadata: Metadata = {
	title: "Demander un devis | Atout Travaux",
	description:
		"Obtenez un devis gratuit pour votre projet de construction, rénovation ou aménagement en Auvergne-Rhône-Alpes.",
};

export default function RequestQuotePage() {
	return <QuoteLayout />;
}
