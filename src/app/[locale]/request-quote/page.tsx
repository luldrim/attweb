import { getTranslations } from "next-intl/server";
import QuoteLayout from "@/components/quote/QuoteLayout";

export async function generateMetadata() {
	const t = await getTranslations("metadata.requestQuote");
	return {
		title: t("title"),
		description: t("description"),
	};
}

export default function RequestQuotePage() {
	return <QuoteLayout />;
}
