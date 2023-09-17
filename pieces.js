const response = await fetch("pieces-autos.json");
const pieces = await response.json();

for (let i = 0; i < pieces.length; i++) {
	const article = pieces[i];

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

	const sectionFiches = document.querySelector(".fiches");
	sectionFiches.appendChild(imageElement);
	sectionFiches.appendChild(nomElement);
	sectionFiches.appendChild(prixElement);
	sectionFiches.appendChild(categorieElement);
	sectionFiches.appendChild(descriptionElement);
	sectionFiches.appendChild(dispoElement);
}
