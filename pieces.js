import { ajoutListenersAvis,ajoutListenerEnvoyerAvis,afficherAvis,afficherGraphiqueAvis } from "./avis.js";

//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces");

if (pieces === null){
	// Récupération des pièces depuis l'API
	const reponse = await fetch("http://localhost:8081/pieces/");
	pieces = await reponse.json();
	// Transformation des pièces en JSON
	const valeurPieces = JSON.stringify(pieces);
	// Stockage des informations dans le localStorage
	window.localStorage.setItem("pieces", valeurPieces);
}else{
	pieces = JSON.parse(pieces);
}

// on appel la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis();


// dans le navigateur, on distingue deux opérations : la création d’un élément, et son ajout réel à la page web

// création d’un élément

function genererPieces(pieces){
	for(let i = 0; i < pieces.length; i++){

		const sectionFiches = document.querySelector(".fiches");
		const article = pieces[i];
		const pieceElement = document.createElement("article");
        
		const imageElement = document.createElement("img");
		imageElement.src = article.image;
		const nomElement = document.createElement("h2");
		nomElement.innerText = article.nom;
		const prixElement = document.createElement("p");
		prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
		const categorieElement = document.createElement("p");
		categorieElement.innerText = article.categorie ?? "(aucune categorie)";
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";
		const stockElement = document.createElement("p");
		stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        
		//Code ajouté
		const avisBouton = document.createElement("button");
		avisBouton.dataset.id = article.id;
		avisBouton.textContent = "Afficher les avis";

		// Rattachement de nos balises au DOM (ajout réel à la page web) "const sectionFiches = document.querySelector(".fiches");"
        
		sectionFiches.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
		pieceElement.appendChild(prixElement);
		pieceElement.appendChild(categorieElement);
		pieceElement.appendChild(descriptionElement);
		pieceElement.appendChild(stockElement);
        
		//Code aJouté
		pieceElement.appendChild(avisBouton);
	}
	ajoutListenersAvis();
    
}
// Premier affichage de la page
genererPieces(pieces);

for(let i = 0; i < pieces.length; i++){
	const id = pieces[i].id;
	const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
	const avis = JSON.parse(avisJSON);

	if(avis !== null){
		const pieceElement = document.querySelector(`article[data-id="${id}"]`);
		afficherAvis(pieceElement, avis);
	}
}


// Ajout du listener
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort(function (a, b) {
		return a.prix - b.prix;
	});
    

	// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= 35;
	});
    
	// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
	const piecesDecroissantes = Array.from(pieces);
	piecesDecroissantes.sort(function (a, b) {
		return  b.prix - a.prix;
	});
    
	// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesDecroissantes);
});

const boutonNoDescription = document.querySelector(".btn-noDescription");
boutonNoDescription.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.description;
	});
    
	// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

//on prend la liste des objets du json qu'avec les noms
const noms = pieces.map(piece=>piece.nom);



//on parcours la liste pour supprimer les pièces non abordables
for(let i = pieces.length -1 ; i >= 0; i--){
	if(pieces[i].prix > 35){
		noms.splice(i,1);
	}
}
console.log(noms);


//Création de la liste
const abordablesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
	const nomElement = document.createElement("li");
	nomElement.innerText = noms[i];
	abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables")
	.appendChild(abordablesElements);

//on prend la liste des objets du json qu'avec les noms
const prix = pieces.map(piece=>piece.prix);


//Pièces disponibles
const disponiblesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for(let i=0; i < prix.length ; i++){
	const nomPrixElement = document.createElement("li");
	if(pieces[i].disponibilite == true){
		nomPrixElement.innerText =`${pieces[i].nom} - ${pieces[i].prix}`; 
		disponiblesElements.appendChild(nomPrixElement);
	}
}
document.querySelector(".disponibles")
	.appendChild(disponiblesElements);


// Efface le contenu de la balise body et donc l’écran
// document.querySelector(".fiches").innerHTML = '';




// input type "range"
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input",function(){
	const piecesFiltrees = pieces.filter(function(piece){
		return piece.prix <= inputPrixMax.value;
	});
	// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
	window.localStorage.removeItem("pieces");
});

await afficherGraphiqueAvis();