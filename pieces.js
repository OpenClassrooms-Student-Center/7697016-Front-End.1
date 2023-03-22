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

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix;
    })
    console.log(piecesOrdonnees)

});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", () => {
   const piecesFiltrees = pieces.filter((piece) => {
       return piece.prix <= 35;
   });
   console.log(piecesFiltrees)
});

const boutonTrierDecroissant = document.querySelector(".btn-trierDecroissant");

boutonTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonneesDecroissant = Array.from(pieces);
    piecesOrdonneesDecroissant.sort(function (a, b) {
        return b.prix - a.prix;
     });
     console.log(piecesOrdonneesDecroissant);
});

const boutonFiltrerDescription = document.querySelector(".btn-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltreesDescription = pieces.filter(function (piece) {
        return piece.description;
    });
   console.log(piecesFiltreesDescription);
});


/* Mapper une liste avec fonction lambda */

const noms = pieces.map(piece => piece.nom)
for (let i = pieces.length -1; i >= 0;  i--) {
    if(pieces[i].prix > 35) {
        noms.splice(i, 1);
    } 
}
//console.log(noms);

const nomsDispos = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDispos.splice(i,1);
    }
}

console.log(nomsDispos)



// On crée la liste d'éléments abordables

const abordablesElements = document.createElement('ul');

// On ajoute le nom de chaque élément

for (let i= 0; i < noms.length; i++) {

    const nomAboradableElement = document.createElement('li');
    nomAboradableElement.innerText = noms[i];
    abordablesElements.appendChild(nomAboradableElement)

}

// Création de la liste des produits disponibles

const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDispos.length ; i++){
    const dispoNomElement = document.createElement('li');
    dispoNomElement.innerText = `${nomsDispos[i]}  -  ${pieces[i].prix} €`;
    disponiblesElements.appendChild(dispoNomElement)
}

// Ajout en-tête et liste au nouveau bloc ajouté html ayant la classe .abordable

document.querySelector('.abordable').appendChild(abordablesElements);

// Ajout des éléments disponibles dans le bloc ayant la classe .disponible

document.querySelector('.disponible').appendChild(disponiblesElements);