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
	{ label: "CGV", href: "#" },
] as const;
