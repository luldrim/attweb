import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import CookieBanner from "@/components/ui/CookieBanner";
import GTMScript from "@/components/ui/GTMScript";

export async function generateMetadata() {
	const t = await getTranslations("metadata.home");
	return {
		title: t("title"),
		description: t("description"),
	};
}

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
			<CookieBanner />
			<GTMScript />
		</NextIntlClientProvider>
	);
}
