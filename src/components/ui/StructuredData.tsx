import { getTranslations } from "next-intl/server";

export default async function StructuredData() {
	const tCompany = await getTranslations("company");
	const tFaq = await getTranslations("faq");
	const tTestimonials = await getTranslations("testimonials");
	const tServices = await getTranslations("services");
	const tMeta = await getTranslations("metadata.home");

	const url = tCompany("url");
	const logo = `${url}${tCompany("logo")}`;
	const language = tCompany("language");

	const geo = tCompany.raw("geo") as { latitude: number; longitude: number };
	const openingDays = tCompany.raw("openingDays") as string[];
	const knowsAbout = tCompany.raw("knowsAbout") as string[];
	const sameAs = tCompany.raw("sameAs") as string[];

	const faqItems = tFaq.raw("items") as {
		question: string;
		answer: string;
	}[];
	const testimonialItems = tTestimonials.raw("items") as {
		name: string;
		role: string;
		quote: string;
		rating: number;
	}[];
	const serviceItems = tServices.raw("items") as {
		title: string;
		description: string;
	}[];

	// --- LocalBusiness (GeneralContractor) ---
	const localBusiness = {
		"@context": "https://schema.org",
		"@type": "GeneralContractor",
		"@id": `${url}/#organization`,
		name: tCompany("name"),
		description: tMeta("description"),
		url,
		logo,
		image: logo,
		telephone: tCompany("phoneHref").replace("tel:", ""),
		email: tCompany("email"),
		foundingDate: tCompany("foundingYear"),
		address: {
			"@type": "PostalAddress",
			streetAddress: tCompany("streetAddress"),
			addressLocality: tCompany("city"),
			postalCode: tCompany("postalCode"),
			addressRegion: tCompany("region"),
			addressCountry: tCompany("country"),
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: geo.latitude,
			longitude: geo.longitude,
		},
		areaServed: {
			"@type": "AdministrativeArea",
			name: tCompany("region"),
		},
		priceRange: tCompany("priceRange"),
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: openingDays,
				opens: tCompany("opens"),
				closes: tCompany("closes"),
			},
		],
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5",
			reviewCount: String(testimonialItems.length),
			bestRating: "5",
			worstRating: "1",
		},
		review: testimonialItems.map((item) => ({
			"@type": "Review",
			author: {
				"@type": "Person",
				name: item.name,
			},
			reviewRating: {
				"@type": "Rating",
				ratingValue: String(item.rating),
				bestRating: "5",
				worstRating: "1",
			},
			reviewBody: item.quote,
		})),
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: tCompany("servicesCatalogName"),
			itemListElement: serviceItems.map((service, i) => ({
				"@type": "OfferCatalog",
				name: service.title,
				description: service.description,
				position: i + 1,
			})),
		},
		slogan: tCompany("tagline"),
		legalName: `${tCompany("name")} ${tCompany("legalForm")}`,
		knowsAbout,
		sameAs,
	};

	// --- WebSite ---
	const webSite = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${url}/#website`,
		name: tCompany("name"),
		url,
		description: tMeta("description"),
		publisher: { "@id": `${url}/#organization` },
		inLanguage: language,
	};

	// --- WebPage ---
	const webPage = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${url}/#webpage`,
		url,
		name: tMeta("title"),
		description: tMeta("description"),
		isPartOf: { "@id": `${url}/#website` },
		about: { "@id": `${url}/#organization` },
		inLanguage: language,
	};

	// --- FAQPage ---
	const faqPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	// --- BreadcrumbList ---
	const breadcrumb = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: tCompany("breadcrumbHome"),
				item: url,
			},
		],
	};

	const schemas = [localBusiness, webSite, webPage, faqPage, breadcrumb];

	return (
		<>
			{schemas.map((schema, i) => (
				<script
					key={i}
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema),
					}}
				/>
			))}
		</>
	);
}
