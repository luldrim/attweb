import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import CTAFooter from "@/components/sections/CTAFooter";
import LegalPage from "@/components/sections/LegalPage";

export async function generateMetadata() {
	const t = await getTranslations("metadata.legalNotice");
	return {
		title: t("title"),
		description: t("description"),
	};
}

export default async function MentionsLegalesPage() {
	const t = await getTranslations("legalNotice");
	const tCompany = await getTranslations("company");

	const replacements: Record<string, string> = {
		name: tCompany("name"),
		legalForm: tCompany("legalForm"),
		capital: tCompany("capital"),
		siret: tCompany("siret"),
		rcs: tCompany("rcs"),
		tvaIntra: tCompany("tvaIntra"),
		director: tCompany("director"),
		address: tCompany("address"),
		phone: tCompany("phone"),
		email: tCompany("email"),
		host: tCompany("host"),
	};

	const rawSections = t.raw("sections") as Array<{
		title: string;
		content: string;
	}>;

	const sections = rawSections.map((section) => ({
		title: section.title,
		content: section.content.replace(
			/\{(\w+)\}/g,
			(_, key: string) => replacements[key] ?? `{${key}}`,
		),
	}));

	return (
		<>
			<Header />
			<LegalPage
				heading={t("heading")}
				lastUpdated={t("lastUpdated")}
				backLink={t("backLink")}
				sections={sections}
			/>
			<CTAFooter />
		</>
	);
}
