const apiPieces = "http://localhost:8081/pieces";
const apiAvis = "http://localhost:8081/avis";

import {
	afficheAvis,
	afficherGraphique,
	ajoutListenerEnvoyerAvis,
	ajoutListenersAvis,
} from "./avis.js";

let pieces = window.localStorage.getItem("pieces");
if (pieces === null) {
	// Récuperation des pieces via l'API
	pieces = await fetch(apiPieces).then((r) => r.json());
	// Transformation des pièces en JSON
	const valeurPrices = JSON.stringify(pieces);
	// Stockage des information dans le lovalStorage
	window.localStorage.setItem("pieces", valeurPrices);
} else {
	pieces = JSON.parse(pieces);
}

// on appel la fonction pour ajouter le listener au furmilaire
ajoutListenerEnvoyerAvis();

function genererPieces(pieces) {
	for (let i = 0; i < pieces.length; i++) {
		const article = pieces[i];
		// Récuperation de l'élément du DOM qui acceuillera les fiches
		const sectionFiches = document.querySelector(".fiches");
		// Création d'une balise dédiée à un pièce  automobile
		const pieceElement = document.createElement("article");
		pieceElement.dataset.id = article.id;
		// Création des balises
		const imageElement = document.createElement("img");
		imageElement.src = article.image;
		const nomElement = document.createElement("h2");
		nomElement.innerText = article.nom;
		const prixElement = document.createElement("p");
		prixElement.innerText = `Prix: ${article.prix} € (${
			article.prix < 35 ? "€" : "€€€"
		}) `;
		const categorieElement = document.createElement("p");
		categorieElement.innerText = article.categorie ?? "";
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText =
			article.description ?? "Pas de description pour le moment";
		const dispoElement = document.createElement("p");
		dispoElement.innerText = `${article.disponibilite ? "En Stock" : "Epuisé"}`;
		const btnArticles = document.createElement("button");
		btnArticles.dataset.id = article.id;
		btnArticles.innerText = "Afficher les avis";

		sectionFiches.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
		pieceElement.appendChild(prixElement);
		pieceElement.appendChild(categorieElement);
		pieceElement.appendChild(descriptionElement);
		pieceElement.appendChild(dispoElement);
		pieceElement.appendChild(btnArticles);
	}
	ajoutListenersAvis(apiAvis);
}

genererPieces(pieces);

for (let i = 0; i < pieces.length; i++) {
	const id = pieces[i].id;
	const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
	const avis = JSON.parse(avisJSON);

	if (avis !== null) {
		const parentElement = document.querySelector(`article[data-id="${id}"]`);
		afficheAvis(parentElement, avis);
	}
}

// Ajouter triage des articles par ordre croissant
const buttonTrier = document.querySelector(".btn-trier");
buttonTrier.addEventListener("click", () => {
	pieces.sort((a, b) => a.prix - b.prix);
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(pieces);
});

// Ajouter un filte
const buttonFilter = document.querySelector(".btn-filtrer");
buttonFilter.addEventListener("click", () => {
	const piecesFiltrees = pieces.filter((p) => {
		return p.prix <= 35;
	});
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Ajouter triage des articles par ordre decroissant
const buttonTrierDecroissant = document.querySelector(".btn-trier-dec");
buttonTrierDecroissant.addEventListener("click", () => {
	pieces.sort((a, b) => b.prix - a.prix);
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(pieces);
});

const buttonFilterDescription = document.querySelector(
	".btn-filtrer-no-description"
);
buttonFilterDescription.addEventListener("click", () => {
	const piecesFiltrees = pieces.filter((p) => {
		return p.description;
	});
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

const nomsArticles = pieces.map((p) => p.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		nomsArticles.splice(i, 1);
	}
}

const abordablesElements = document.createElement("ul");
for (let i = 0; i < nomsArticles.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = nomsArticles[i];
	abordablesElements.appendChild(nomElement);
}
document.querySelector(".abordables").appendChild(abordablesElements);

const dispoElements = document.createElement("ul");
const nomsDisponile = pieces.map((p) => p.nom);
const prixDidponile = pieces.map((p) => p.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].disponibilite === false) {
		nomsDisponile.splice(i, 1);
		prixDidponile.splice(i, 1);
	}
}

for (let i = 0; i < nomsDisponile.length; i++) {
	const dispoElement = document.createElement("li");
	dispoElement.innerText = `${nomsDisponile[i]} - ${prixDidponile[i]} €`;
	dispoElements.appendChild(dispoElement);
}

document.querySelector(".piece-dispo").appendChild(dispoElements);

const inputRange = document.querySelector(".input-range");
inputRange.addEventListener("input", (e) => {
	const prixFiltrer = pieces.filter((p) => p.prix <= inputRange.value);
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(prixFiltrer);
});
// Ajouter du listener pour mettre à jour des donnés du localStorage
const buttonMAJ = document.querySelector(".btn-maj");
buttonMAJ.addEventListener("click", () => {
	// Pour supprimer tout le localStorage utiliser clear()
	window.localStorage.clear();
});

await afficherGraphique(apiAvis, "Nb avis", "y", "#graphique-avis");
await afficherGraphique(apiAvis, "Nb ommentaire", "x", "#graphique-piece");
