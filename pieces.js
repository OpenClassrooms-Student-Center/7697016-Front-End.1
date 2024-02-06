//recuperation des pieces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
let index = 0;



for (index = 0; index < pieces.length; index++) {
    
const article = pieces[index];
const imgElement = document.createElement("img");
imgElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText =`Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const catElement = document.createElement("p");
catElement.innerText = article.categorie ?? "(aucune categorie)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

const sectionFiches = document.querySelector(".fiches");
const pieceElement = document.createElement("article")

sectionFiches.appendChild(pieceElement);
pieceElement.appendChild(imgElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(catElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(disponibiliteElement);
}