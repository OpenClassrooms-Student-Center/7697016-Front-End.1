// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


//Fonction qui génère toute la page web
function genererPièces(pieces){
    for(let i=0; i < pieces.length; i++){

        const article = pieces[i]; 
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");


        // Création d'une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // On crée l'élément image
        const imageElement = document.createElement("img"); 
        // On accède à l'indice i de la liste pieces pour configurer la source de l'image.
        imageElement.src = pieces[i].image;


        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€"  : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        
        
        //On rattache la balise article à la section Fiches
        sectionFiches.appendChild(pieceElement);


        // On rattache l'image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        
        }
        
}

//Premier affichage de la page
genererPièces(pieces);


const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function(a, b){
        return a.prix - b.prix;
    });
    //Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = '';
    genererPièces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    //Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = '';
    genererPièces(piecesFiltrees);
});

const boutonFiltrerDescription = document .querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPièces(piecesFiltrees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function(a, b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPièces(piecesOrdonnees);
})

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1; i>=0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i, 1)
    }
}
console.log(noms);

const pElement = document.createElement('p');
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
//Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
.appendChild(pElement)
.appendChild(abordablesElements)

//const prix_doubles = pieces.map(piece => piece.prix * 2);
//console.log(prix_doubles);

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece =>piece.prix);
for(let i = pieces.length -1; i>=0; i--){
    if(pieces[i].disponibilite == false){
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
        
    }
    
}

const disponibilitesElements = document.createElement('ul');
for(let i=0; i< nomsDisponibles.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponibilitesElements.appendChild(nomElement)
}

const pElementDisponibles = document.createElement('p');
pElementDisponibles.innerText = "Pièces disponibles";
document.querySelector('.disponibles').appendChild(pElementDisponibles).appendChild(disponibilitesElements)

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax;addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;

    });
    document.querySelector(".fiches").innerHTML = '';
    genererPièces(piecesFiltrees);
})
