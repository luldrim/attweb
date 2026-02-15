# Guide de configuration du tracking

Ce guide explique comment configurer Google Analytics, des pixels marketing et d'autres outils de suivi via Google Tag Manager (GTM), sans toucher au code du site.

---

## Prérequis

- Un compte Google Tag Manager : [tagmanager.google.com](https://tagmanager.google.com)
- L'ID du conteneur GTM (format `GTM-XXXXXXX`) doit être renseigné dans le fichier `.env.local` du site :
  ```
  NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
  ```

---

## 1. Ajouter Google Analytics (GA4)

1. Aller sur [tagmanager.google.com](https://tagmanager.google.com) et sélectionner votre conteneur
2. Cliquer sur **"Nouveau tag"** (Tags > New)
3. Choisir le type **"Google Analytics: GA4 Configuration"**
4. Renseigner votre **Measurement ID** (format `G-XXXXXXX`, trouvable dans GA4 > Admin > Data Streams)
5. Dans **Déclencheur**, choisir **"Consent Initialized - Analytics"**
   - Si ce trigger n'existe pas encore, voir la section 3 ci-dessous pour le créer
6. Nommer le tag (ex: "GA4 - Configuration")
7. Cliquer sur **"Enregistrer"** puis **"Publier"** (bouton en haut à droite)

Le tag GA4 ne se déclenchera que si l'utilisateur accepte les cookies analytiques.

---

## 2. Ajouter un pixel marketing (Facebook, LinkedIn, etc.)

1. Dans GTM, cliquer sur **"Nouveau tag"**
2. Choisir le type **"Custom HTML"**
3. Coller le script du pixel fourni par la plateforme (Facebook, LinkedIn, etc.)
4. Dans **Déclencheur**, choisir **"Consent Initialized - Marketing"**
   - Si ce trigger n'existe pas encore, voir la section 3 ci-dessous pour le créer
5. Nommer le tag (ex: "Facebook Pixel")
6. **"Enregistrer"** puis **"Publier"**

Le pixel ne se chargera que si l'utilisateur accepte les cookies marketing dans la bannière.

---

## 3. Configuration des triggers Consent Mode v2 dans GTM

Le site envoie des signaux de consentement via Google Consent Mode v2. Voici comment créer les triggers correspondants dans GTM.

### Trigger "Consent Initialized - Analytics"

1. Aller dans **Triggers** > **New**
2. Type de trigger : **"Initialization - All Pages"**
3. Ajouter une condition :
   - Aller dans **Advanced Settings** > **Additional Tag Firing Options**
   - Cocher **"Require additional consent for tag to fire"**
   - Ajouter : `analytics_storage = granted`
4. Nommer le trigger "Consent Initialized - Analytics"

### Trigger "Consent Initialized - Marketing"

Même procédure, mais avec la condition :
- `ad_storage = granted`

### Mapping des catégories

| Catégorie dans la bannière | Signal GTM Consent Mode |
|---------------------------|------------------------|
| Analytiques | `analytics_storage` |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` |
| Nécessaires | `functionality_storage`, `security_storage` (toujours granted) |

---

## 4. Vérifier que tout fonctionne

### Mode Preview de GTM

1. Dans GTM, cliquer sur **"Prévisualiser"** (bouton en haut à droite)
2. Entrer l'URL du site
3. Une fenêtre de debug s'ouvre en bas de page
4. Vérifier que :
   - Les tags ne se déclenchent **pas** avant le consentement
   - Après avoir cliqué "Tout accepter", les tags se déclenchent
   - Après avoir refusé, aucun tag n'est actif

### Via les DevTools du navigateur

1. Ouvrir les DevTools (F12) > onglet **Network**
2. Avant consentement : aucune requête vers `google-analytics.com` ou `googletagmanager.com`
3. Après "Tout accepter" : les requêtes apparaissent
4. Onglet **Application** > **Local Storage** : vérifier la clé `atout-consent`

---

## 5. FAQ

### "Je veux ajouter Hotjar ou Microsoft Clarity"
Utilisez la catégorie **analytiques**. Créez un tag Custom HTML dans GTM avec le trigger "Consent Initialized - Analytics".

### "Je veux ajouter Google Ads remarketing"
Utilisez la catégorie **marketing**. Créez le tag Google Ads dans GTM avec le trigger "Consent Initialized - Marketing".

### "Je veux changer les textes de la bannière cookies"
Modifiez le fichier `messages/fr.json`, section `cookieConsent`. Tous les textes y sont centralisés.

### "Je veux ajouter une nouvelle catégorie de cookies"
Cela nécessite une modification du code source (fichiers `consent.ts` et `CookieBanner.tsx`). Contactez le développeur.

### "La bannière ne s'affiche plus"
L'utilisateur a déjà fait son choix (stocké dans le Local Storage). Pour la revoir :
- Cliquer sur **"Gérer les cookies"** dans le pied de page
- Ou supprimer la clé `atout-consent` dans DevTools > Application > Local Storage
