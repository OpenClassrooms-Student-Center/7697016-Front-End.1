

const reponse= await fetch('../pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length ; i++) {


const article = pieces[i];
const imageElement=document.createElement('img');
imageElement.src = article.image;

const titleElement=document.createElement('div');

titleElement.classList.add('font-bold', 'text-lg', 'mb-2');
titleElement.innerText = article.nom;

const prixElement=document.createElement('div');
prixElement.classList.add('text-gray-600', 'mb-2');
prixElement.innerHTML = `Prix: ${article.prix}  ${article.prix < 35 ? '<span class="text-green-500 font-extrabold">fcfa</span>' : '<span class="text-red-500 font-extrabold">fcfa</span>'}`;

const categorieElement=document.createElement('div');
categorieElement.classList.add('text-gray-600', 'mb-2');
categorieElement.innerText = article.categorie ?? 'Non spécifiée';

const descriptionElement=document.createElement('div');
descriptionElement.classList.add('text-gray-600', 'mb-2');
descriptionElement.innerText = article.description ?? 'Aucune description disponible';

const stautusElement=document.createElement('div');
stautusElement.classList.add('text-gray-600', 'mb-2');
stautusElement.innerHTML= '<span class="text-green-500 font-bold">En Stock</span>' ?? '<span class="text-red-500 font-extrabold">Indisponible</span>';

const sectionFiche=document.querySelector('.fiches');
const carte= document.createElement('div');
carte.classList.add( 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4');
carte.appendChild(imageElement);
carte.appendChild(titleElement);
carte.appendChild(prixElement);
carte.appendChild(categorieElement);
carte.appendChild(descriptionElement);
carte.appendChild(stautusElement);
sectionFiche.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4');
sectionFiche.appendChild(carte);


}

const btnT=document.querySelector('.btn-trier');
const btnF=document.querySelector('.btn-filtrer');

btnT.addEventListener("click", function() {
    const pieceOrdonne=Array.from(pieces);
    pieceOrdonne.sort(function(a, b) {
        return a.prix - b.prix;
    });
    console.log(pieceOrdonne);

})

btnF.addEventListener("click", function() {
 const  piecesfiltre=pieces.filter(function(piece) {
        return piece.prix < 35;
    });
    console.log(piecesfiltre);
});

const btnTC=document.querySelector('.btn-decroissant');
btnTC.addEventListener("click", function() {
    const pieceOrdonne=Array.from(pieces);
    pieceOrdonne.sort(function(a, b) {
        return b.prix - a.prix;
    });
    console.log(pieceOrdonne);
})

const btnD=document.querySelector('.btn-decrite');

btnD.addEventListener("click", function() {
    const pieceDecrite=pieces.filter(function(piece) {
        return piece.description !== null && piece.description !== '';
    });
    console.log(pieceDecrite);
})
