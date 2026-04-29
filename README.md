# Immo_Luxe

Immo_Luxe est une plateforme immobilière haut de gamme créée avec React 19, TypeScript, TailwindCSS et Framer Motion.

## Fonctionnalités

- Page d’accueil avec hero, recherche et biens en vedette
- Catalogue de propriétés avec filtres et pagination
- Pages de détail des biens avec galerie, mock de carte et contact agent
- Page agents avec cartes de profil
- Pages À propos et Contact
- Favoris persistants dans le navigateur
- Simulateur d’API JSON avec données de propriétés et agents
- Animations fluides et responsive design

## Structure du projet

- `src/components` : composants réutilisables
- `src/pages` : pages applicatives
- `src/context` : gestion des favoris
- `src/services` : API simulées et données de mock
- `src/types` : typage TypeScript strict
- `src/layouts` : layout global avec navigation et footer

## Installation

```bash
npm install
```

## Exécution en développement

```bash
npm run dev
```

Puis ouvrez le lien affiché dans votre terminal.

## Construction production

```bash
npm run build
```

## Informations complémentaires

- Le projet utilise `react-router-dom` pour la navigation
- Tailwind CSS est configuré avec le plugin `@tailwindcss/vite`
- Les données sont simulées dans `src/services/mockData.ts`
- Le contexte `FavoritesContext` gère l’ajout et la suppression des favoris
