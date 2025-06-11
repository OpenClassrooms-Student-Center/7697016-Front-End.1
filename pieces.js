

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
    
})

const btnD=document.querySelector('.btn-decrite');

btnD.addEventListener("click", function() {
    const pieceDecrite=pieces.filter(function(piece) {
        return piece.description ;
    });
   
})

const noms=pieces.map(piece => piece.nom);
const prix=pieces.map(piece=>piece.prix);
for (let i=pieces.length -1 ; i>=0;i--){
    if (pieces[i].prix > 35) {
        noms.splice(i, 1);
        prix.splice(i, 1);
       }
      
    } 
    
    console.log(noms);

const abordable = document.createElement('div');
abordable.classList.add('bg-green-100', 'text-green-800', 'p-4', 'rounded-lg', 'mb-4');
const titreAbordable = document.createElement('h2');
titreAbordable.classList.add('text-xl', 'font-bold', 'mb-2');
titreAbordable.innerText = 'Pièces Abordables';
abordable.appendChild(titreAbordable);
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('div');
   nomElement.innerHTML = `${noms[i]} -- ${prix[i]} fcfa`;
    abordable.appendChild(nomElement);
}

const sectionAbordable = document.querySelector('.abordable');
sectionAbordable.appendChild(abordable);

const description = pieces.map(piece=>piece.description);

const descriptionElement = document.createElement('div');
descriptionElement.classList.add('bg-blue-100', 'text-blue-800', 'p-4', 'rounded-lg', 'mb-4');

for( let i = 0; i < description.length; i++) {
    const descElement = document.createElement('div');
    descElement.innerText = description[i];
    descriptionElement.appendChild(descElement);
}
const sectionDescription = document.querySelector('.description');
sectionDescription.appendChild(descriptionElement);
