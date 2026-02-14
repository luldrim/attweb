# Guide d'édition du contenu — Atout Travaux

## Fichier principal

Tout le texte du site est dans **`messages/fr.json`**. C'est le seul fichier à modifier pour changer le contenu.

## Structure

Le fichier est organisé par section du site :

| Clé | Section | Description |
|-----|---------|-------------|
| `metadata` | SEO | Titres et descriptions des pages |
| `company` | Global | Nom, téléphone, email, adresse |
| `nav` | Header/Menu | Liens de navigation, textes du menu mobile |
| `hero` | Accueil | Titre principal, bouton CTA, statistiques |
| `about` | À propos | Titre, sous-titre, bouton |
| `stats` | À propos | Chiffres clés (tableau) |
| `features` | À propos | Caractéristiques en grille (tableau) |
| `services` | Services | Titre + liste des services (tableau) |
| `projects` | Réalisations | Titre + liste des projets (tableau) |
| `testimonials` | Témoignages | Titre + avis clients (tableau) |
| `beforeAfter` | Avant/Après | Texte de la section rénovation |
| `faq` | FAQ | Questions/réponses (tableau) |
| `ctaFooter` | Pied de page CTA | Texte d'appel à l'action |
| `footer` | Pied de page | Contact, liens légaux |
| `contactModal` | Modal contact | Formulaire de contact |
| `quote` | Page devis | Formulaire multi-étapes |

## Règles

1. **Ne jamais modifier les clés** — seulement les valeurs (texte entre guillemets)
2. **Garder la structure JSON valide** — attention aux virgules et guillemets
3. **Les tableaux** (`stats`, `features`, `services.items`, `projects.items`, `testimonials.items`, `faq.items`) : ne pas changer le nombre d'éléments sans vérifier le code
4. **`company.phoneHref`** doit correspondre à `company.phone` au format `tel:+33...`
5. **Les caractères spéciaux** : utiliser les codes Unicode si nécessaire (ex: `\u2011` pour tiret insécable)

## Exemples de modifications courantes

### Changer le numéro de téléphone
```json
"company": {
  "phone": "04 73 12 34 56",
  "phoneHref": "tel:+33473123456",
```

### Changer un témoignage
```json
"testimonials": {
  "items": [
    {
      "name": "Nouveau Nom",
      "role": "Sa fonction",
      "quote": "Son témoignage...",
      "rating": 5
    },
```

### Ajouter une question FAQ
Ajouter un objet dans le tableau `faq.items` :
```json
{ "question": "Ma nouvelle question ?", "answer": "La réponse détaillée." }
```

### Modifier un service
Changer les valeurs dans `services.items[index]` :
```json
{
  "number": "01",
  "title": "Nouveau titre",
  "subtitle": "Nouveau sous-titre",
  "stat": "300+",
  "statLabel": "/ Nouveau label",
  "description": "Nouvelle description du service."
}
```

## Ce qui ne se change PAS dans ce fichier

- Les images (dans `src/lib/constants.ts`)
- Les couleurs et le style (dans `src/app/globals.css`)
- La structure des pages (dans les composants React)
- Les icônes des types de projet (dans `src/lib/constants.ts`)
