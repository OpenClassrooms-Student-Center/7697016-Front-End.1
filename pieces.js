import { ajoutListenersAvis } from './avis.js'; // Importation de la fonction ajoutListenersAvis depuis le fichier avis.js

// Importation de la fonction ajoutListenersAvis depuis le fichier avis.js

const reponse= await fetch('../pieces-autos.json');
const pieces = await reponse.json();
// Récupération des données depuis le fichier JSON

function generatePieces(pieces){



for (let i = 0; i < pieces.length ; i++) {
const article=pieces[i];

// Création des éléments HTML pour chaque pièce
const piecesElement = document.createElement('div');
piecesElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4');


const imageElement=document.createElement('img');
imageElement.src = pieces[i].image;

const titleElement=document.createElement('div');
titleElement.classList.add('font-bold', 'text-lg', 'mb-2');
titleElement.innerText = pieces[i].nom;

const prixElement=document.createElement('div');
prixElement.classList.add('text-gray-600', 'mb-2');
prixElement.innerHTML = `Prix: ${pieces[i].prix}  ${pieces[i].prix < 35 ? '<span class="text-green-500 font-extrabold">fcfa</span>' : '<span class="text-red-500 font-extrabold">fcfa</span>'}`;

const categorieElement=document.createElement('div');
categorieElement.classList.add('text-gray-600', 'mb-2');
categorieElement.innerText = pieces[i].categorie ?? 'Non spécifiée';

const descriptionElement=document.createElement('div');
descriptionElement.classList.add('text-gray-600', 'mb-2');
descriptionElement.innerText = pieces[i].description ?? 'Aucune description disponible';

const stautusElement=document.createElement('div');
stautusElement.classList.add('text-gray-600', 'mb-2');
stautusElement.innerHTML= '<span class="text-green-500 font-bold">En Stock</span>' ?? '<span class="text-red-500 font-extrabold">Indisponible</span>';

const sectioFiches = document.querySelector('.fiches');
sectioFiches.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4','durration-500', 'transition-all', 'ease-in-out');

const avis= document.createElement('button');
avis.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded', 'hover:bg-blue-600');
avis.innerText = 'Avis';
avis.dataset.id = article.id; // Ajout de l'ID de la pièce pour l'utilisation dans la fonction ajoutListenersAvis
avis.innerText = 'consulter Avis';
// Créer la carte pour chaque pièce
const carte= document.createElement('div');
carte.classList.add( 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4');
carte.appendChild(imageElement);
carte.appendChild(titleElement);
carte.appendChild(prixElement);
carte.appendChild(categorieElement);
carte.appendChild(descriptionElement);
carte.appendChild(stautusElement);
carte.appendChild(avis);
sectioFiches.appendChild(carte);


}
// Ajout de la fonction ajoutListenersAvis
ajoutListenersAvis();
};

generatePieces(pieces);


// Code pour trier et filtrer les pièces
const btnTrier = document.querySelector('.btn-trier');
btnTrier.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });

    document.querySelector('.fiches').innerHTML = ''; // Effacer le contenu de l'espace avant d'ajouter les cartes
    generatePieces(piecesOrdonnees);
});

const filtre= document.querySelector('.filtre');
filtre.addEventListener("input", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= filtre.value;
    })
    document.querySelector('.fiches').innerHTML = ''; // Effacer le contenu de l'espace avant d'ajouter les cartes
    generatePieces(piecesFiltrees);
});

