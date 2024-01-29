//recuperation des pieces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

const article = pieces[0];
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
sectionFiches.appendChild(imgElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(catElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiliteElement);
