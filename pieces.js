// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-auto.json");
const pieces = await reponse.json();

//Création des quatres balises
const article = pieces[0];

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} €`; //littéraux de gabarit ou template string

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;
