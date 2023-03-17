// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// Créations des éléments dynamiquement

for (let i = 0; i < pieces.length; i++) {

const article = pieces[i];
const sectionFiches = document.querySelector(".fiches");
// nouvel élément pour balise article liée à automobile
const pieceElement = document.createElement("article");
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

// Insertion des éléments dans le parent qui a la classe ".fiches"

// insertion du nouvel élément article à la section Fiche
sectionFiches.appendChild(pieceElement);
// on rattache tout le reste à pieceElement
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(disponibiliteElement);
}