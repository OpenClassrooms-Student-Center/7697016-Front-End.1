import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";


// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:8081/pieces');
const pieces = await reponse.json()

ajoutListenerEnvoyerAvis();

//Fonction qui génère toute la page

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        const sectionFiches = document.querySelector(".fiches");        
        // La piece principale 
        const pieceElement = document.createElement("article");
        // Images
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        // Nom
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        // Prix
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} $ (${article.prix < 35 ? "$" : "$$$"})`;
        // Catégorie
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        // Description
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";
        // Disponibilité
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        // Ajout du code pour les boutons d'avis

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        avisBouton.classList.add('bouton-fiche');
        // on rattache tout le reste à pieceElement
       
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);

        //Code aJouté
        pieceElement.appendChild(avisBouton);
    }

    // Ajout de la fonction ajoutListenerAvis
    ajoutListenersAvis();
}

// Efface le contenu de la balise body et donc l’écran
//document.querySelector(".fiches").innerHTML = '';
genererPieces(pieces)

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix;
    })
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees)

});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", () => {
   const piecesFiltrees = pieces.filter((piece) => {
       return piece.prix <= 35;
    });    
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees)
});

const boutonTrierDecroissant = document.querySelector(".btn-trierDecroissant");

boutonTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonneesDecroissant = Array.from(pieces);
    piecesOrdonneesDecroissant.sort(function (a, b) {
        return b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = '';
     genererPieces(piecesOrdonneesDecroissant)
});

const boutonFiltrerDescription = document.querySelector(".btn-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltreesDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltreesDescription)
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
const prixDispos = pieces.map(piece => piece.prix)

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDispos.splice(i,1);
        prixDispos.splice(i,1);
    }
}

//console.log(nomsDispos)

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
    dispoNomElement.innerText = `${nomsDispos[i]}  -  ${prixDispos[i]} $`;
    disponiblesElements.appendChild(dispoNomElement)
}

// Ajout en-tête et liste au nouveau bloc ajouté html ayant la classe .abordable

document.querySelector('.abordable').appendChild(abordablesElements);

// Ajout des éléments disponibles dans le bloc ayant la classe .disponible

document.querySelector('.disponible').appendChild(disponiblesElements);

const prixMax = document.querySelector('#prixMax');
prixMax.addEventListener('input', () => {
    const lesPiecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= prixMax.value;
    })
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(lesPiecesFiltrees)
})

