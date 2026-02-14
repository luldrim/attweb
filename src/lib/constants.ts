export const COMPANY = {
	name: "Atout Travaux",
	tagline: "Maître d'œuvre — Tous corps d'état",
	phone: "04 73 00 00 00",
	phoneHref: "tel:+33473000000",
	email: "contact@atouttravaux.fr",
	address: "15 rue des Bâtisseurs, 63000 Clermont-Ferrand",
	region: "Auvergne-Rhône-Alpes",
};

export const NAV_LINKS = [
	{ label: "Accueil", href: "#accueil" },
	{ label: "Services", href: "#services" },
	{ label: "Réalisations", href: "#realisations" },
	{ label: "À propos", href: "#apropos" },
	{ label: "Témoignages", href: "#temoignages" },
	{ label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
	{
		number: "01",
		title: "Gros œuvre & Construction",
		subtitle: "Des fondations solides",
		stat: "200+",
		statLabel: "/ Projets de construction livrés",
		description:
			"Construction de structures durables : fondations, murs porteurs, dalles et charpentes. Un savoir-faire éprouvé pour des bâtiments qui traversent le temps.",
		image:
			"https://framerusercontent.com/images/64uj7eqhzqbYL4mmeH7Bg9IFZQ.png",
	},
	{
		number: "02",
		title: "Rénovation complète",
		subtitle: "Transformer l'existant",
		stat: "150+",
		statLabel: "/ Rénovations menées à bien",
		description:
			"Réhabilitation, mise aux normes et modernisation de bâtiments existants. Nous transformons vos espaces avec exigence et respect du bâti.",
		image:
			"https://framerusercontent.com/images/dKG94C76HSIkmG9hqW8PIAgIhHg.jpg",
	},
	{
		number: "03",
		title: "Aménagement intérieur",
		subtitle: "Design sur mesure",
		stat: "100+",
		statLabel: "/ Espaces aménagés",
		description:
			"Création d'intérieurs personnalisés : cloisons, faux-plafonds, revêtements et agencements pensés pour votre confort et votre style de vie.",
		image:
			"https://framerusercontent.com/images/i0WNBMzrAXimKGISmeXmgr2MV9o.png",
	},
	{
		number: "04",
		title: "Toiture & Couverture",
		subtitle: "Protection durable",
		stat: "80+",
		statLabel: "/ Toitures réalisées",
		description:
			"Création, réparation et isolation de toitures : tuiles, ardoises, zinc et solutions d'étanchéité pour une protection optimale.",
		image:
			"https://framerusercontent.com/images/5K3xvbgO3zZNdCmkwScX10zL0A.png",
	},
	{
		number: "05",
		title: "Électricité & Plomberie",
		subtitle: "Installations fiables",
		stat: "120+",
		statLabel: "/ Installations réalisées",
		description:
			"Installation et rénovation des réseaux électriques et sanitaires dans le respect des normes en vigueur, pour un confort au quotidien.",
		image:
			"https://framerusercontent.com/images/3iEk0bZHO5pBUZxqzXc4hhl3Y.png",
	},
] as const;

export const PROJECTS = [
	{
		title: "Villa Horizon",
		date: "Juil. 2025",
		image:
			"https://framerusercontent.com/images/s16J2lH0B6tG5iEW50pxO7u0bM.png",
	},
	{
		title: "Résidence du Lac",
		date: "Juin 2025",
		image:
			"https://framerusercontent.com/images/yVLzSL31P9aoUH1enRvnFTQjPDs.png",
	},
	{
		title: "Loft Moderniste",
		date: "Juin 2025",
		image:
			"https://framerusercontent.com/images/I73Il1RmteiJeMxKuQ0bhV0M.png",
	},
	{
		title: "Mas des Collines",
		date: "Mai 2025",
		image:
			"https://framerusercontent.com/images/JR5J45PG8hmzgfaKR2InU59S1eA.jpg",
	},
] as const;

export const STATS = [
	{ value: "15+", label: "Années d'expérience" },
	{ value: "500+", label: "Projets réalisés" },
	{ value: "98%", label: "Clients satisfaits" },
	{ value: "50+", label: "Artisans partenaires" },
] as const;

export const TESTIMONIALS = [
	{
		name: "Marie Dupont",
		role: "Propriétaire à Lyon",
		quote:
			"Atout Travaux a su transformer notre maison des années 70 en un espace moderne et lumineux. Le suivi du chantier était irréprochable et les délais parfaitement respectés.",
		rating: 5,
	},
	{
		name: "Jean-Pierre Martin",
		role: "Gérant de restaurant, Clermont-Ferrand",
		quote:
			"Pour la rénovation complète de notre restaurant, nous avions besoin d'un interlocuteur unique. Atout Travaux a coordonné tous les corps de métier avec un professionnalisme remarquable.",
		rating: 5,
	},
	{
		name: "Sophie & Laurent Bernard",
		role: "Propriétaires à Annecy",
		quote:
			"De la conception à la livraison de notre villa, l'équipe a fait preuve d'un savoir-faire exceptionnel. Le résultat dépasse nos attentes. Nous recommandons sans hésiter.",
		rating: 5,
	},
] as const;

export const FEATURES = [
	{
		number: "01",
		title: "Souci du détail",
		description:
			"Plus de 500 projets livrés avec un niveau d'exigence qui fait la différence à chaque étape.",
	},
	{
		number: "02",
		title: "Matériaux durables",
		description:
			"Plus de 500 projets réalisés avec des matériaux sélectionnés pour leur qualité et leur longévité.",
	},
	{
		number: "03",
		title: "L'esthétique au service du projet",
		description:
			"Plus de 500 projets livrés où le beau rencontre le fonctionnel pour des résultats concrets.",
	},
] as const;

export const FAQ_ITEMS = [
	{
		question: "Quels types de travaux réalisez-vous ?",
		answer:
			"Nous intervenons sur tous corps d'état : gros œuvre, rénovation complète, aménagement intérieur, toiture, électricité, plomberie et menuiserie. Un seul interlocuteur pour l'ensemble de votre projet.",
	},
	{
		question: "Comment se déroule un projet avec Atout Travaux ?",
		answer:
			"Nous commençons par une visite et un diagnostic gratuit, puis nous établissons un devis détaillé. Après validation, nous coordonnons l'ensemble des artisans et assurons un suivi rigoureux jusqu'à la livraison finale.",
	},
	{
		question: "Quelle est la durée moyenne d'un chantier ?",
		answer:
			"La durée varie selon l'ampleur du projet : comptez 2 à 4 semaines pour un aménagement intérieur, 2 à 4 mois pour une rénovation complète. Nous vous communiquons un planning précis avant le démarrage.",
	},
	{
		question: "Proposez-vous un devis gratuit ?",
		answer:
			"Oui, nous réalisons un devis détaillé et gratuit après une visite sur site. Ce devis est transparent, sans frais cachés, et reste valable 3 mois.",
	},
	{
		question: "Quelles garanties offrez-vous ?",
		answer:
			"Tous nos travaux sont couverts par une garantie décennale et une assurance responsabilité civile professionnelle. Nous travaillons exclusivement avec des artisans qualifiés et certifiés.",
	},
	{
		question: "Intervenez-vous en dehors de Clermont-Ferrand ?",
		answer:
			"Oui, nous intervenons sur l'ensemble de la région Auvergne-Rhône-Alpes. N'hésitez pas à nous contacter pour vérifier la disponibilité dans votre secteur.",
	},
] as const;

export const FOOTER_SERVICES = [
	"Gros œuvre",
	"Rénovation",
	"Aménagement intérieur",
	"Électricité & Plomberie",
	"Menuiserie",
	"Toiture",
] as const;

export const FOOTER_LEGAL = [
	{ label: "Mentions légales", href: "#" },
	{ label: "Politique de confidentialité", href: "#" },
] as const;

export const QUOTE_STEPS = [
	{ title: "Qui êtes-vous ?", subtitle: "Vos coordonnées" },
	{ title: "Votre projet", subtitle: "Type et localisation" },
	{ title: "Détails", subtitle: "Description et fichiers" },
] as const;

export const QUOTE_PROJECT_TYPES = [
	{
		value: "renovation" as const,
		label: "Rénovation",
		icon: "🔨",
		description: "Moderniser un espace existant",
	},
	{
		value: "construction" as const,
		label: "Construction neuve",
		icon: "🏗️",
		description: "Bâtir un nouveau projet",
	},
	{
		value: "amenagement" as const,
		label: "Aménagement intérieur",
		icon: "🏠",
		description: "Optimiser vos espaces",
	},
	{
		value: "extension" as const,
		label: "Extension / Surélévation",
		icon: "📐",
		description: "Agrandir votre bien",
	},
] as const;

export const QUOTE_CAROUSEL_SLIDES = [
	{
		image: PROJECTS[0].image,
		title: PROJECTS[0].title,
		quote: TESTIMONIALS[0].quote,
		author: TESTIMONIALS[0].name,
		role: TESTIMONIALS[0].role,
	},
	{
		image: PROJECTS[1].image,
		title: PROJECTS[1].title,
		quote: TESTIMONIALS[1].quote,
		author: TESTIMONIALS[1].name,
		role: TESTIMONIALS[1].role,
	},
	{
		image: PROJECTS[2].image,
		title: PROJECTS[2].title,
		quote: TESTIMONIALS[2].quote,
		author: TESTIMONIALS[2].name,
		role: TESTIMONIALS[2].role,
	},
] as const;
