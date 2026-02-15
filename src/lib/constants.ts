// ─── Technical config only — text content lives in messages/fr.json ───

// Navigation hrefs (site structure — does not change with language)
export const NAV_HREFS = [
	"#accueil",
	"#services",
	"#realisations",
	"#apropos",
	"#temoignages",
	"#contact",
] as const;

// Service images
export const SERVICE_IMAGES = [
	"https://framerusercontent.com/images/64uj7eqhzqbYL4mmeH7Bg9IFZQ.png",
	"https://framerusercontent.com/images/dKG94C76HSIkmG9hqW8PIAgIhHg.jpg",
	"https://framerusercontent.com/images/i0WNBMzrAXimKGISmeXmgr2MV9o.png",
	"https://framerusercontent.com/images/5K3xvbgO3zZNdCmkwScX10zL0A.png",
	"https://framerusercontent.com/images/3iEk0bZHO5pBUZxqzXc4hhl3Y.png",
] as const;

// Project images
export const PROJECT_IMAGES = [
	"https://framerusercontent.com/images/s16J2lH0B6tG5iEW50pxO7u0bM.png",
	"https://framerusercontent.com/images/yVLzSL31P9aoUH1enRvnFTQjPDs.png",
	"https://framerusercontent.com/images/I73Il1RmteiJeMxKuQ0bhV0M.png",
	"https://framerusercontent.com/images/JR5J45PG8hmzgfaKR2InU59S1eA.jpg",
] as const;

// Testimonial avatars
export const TESTIMONIAL_AVATARS = [
	"https://framerusercontent.com/images/oDC12RKl3RMQUdu2JGGhxj544M.jpeg",
	"https://framerusercontent.com/images/ZokFTvIUZIDAmlsADCohr7aSmA.jpeg",
	"https://framerusercontent.com/images/2Y0ya9oktSQl8lubjb0qzVo77Ts.jpeg",
] as const;

// Project type config (icons + enum values for form logic)
export const PROJECT_TYPE_VALUES = [
	"renovation",
	"construction",
	"amenagement",
	"extension",
] as const;

export const PROJECT_TYPE_ICONS = ["🔨", "🏗️", "🏠", "📐"] as const;

// Footer legal hrefs
export const LEGAL_HREFS = ["/mentions-legales", "/politique-de-confidentialite"] as const;

// Quote carousel: combines project images with testimonial data by index
export const QUOTE_CAROUSEL_IMAGES = [
	PROJECT_IMAGES[0],
	PROJECT_IMAGES[1],
	PROJECT_IMAGES[2],
] as const;
