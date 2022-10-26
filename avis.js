export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {
 
        const id = event.target.dataset.id;
        const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
        const avis = await reponse.json();
        const pieceElement = event.target.parentElement;

        const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
        }
        pieceElement.appendChild(avisElement);
 
     });
 
    }
 
 }
 