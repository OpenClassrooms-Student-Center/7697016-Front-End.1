export function ajoutListenersAvis() {
	const piecesElements = document.querySelectorAll(".fiches article button");
	//
	for (let i = 0; i < piecesElements.length; i++) {
		//
		piecesElements[i].addEventListener("click", async (event) => {
			//
			const id = event.target.dataset.id;
			const avis = await fetch(`http://localhost:8081/pieces/${id}/avis`).then(
				(r) => r.json()
			);
			window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
			const parentElement = event.target.parentElement;
			afficheAvis(parentElement, avis);
		});
	}
}

export function afficheAvis(parentElement, avis) {
	const avisElement = document.createElement("p");
	for (let i = 0; i < avis.length; i++) {
		avisElement.innerHTML += `${avis[i].utilisateur}: ${
			avis[i].commentaire
		} <br/> ${avis[i].nbEtoiles ?? ""} <br/>`;
	}
	parentElement.appendChild(avisElement);
}

export function ajoutListenerEnvoyerAvis() {
	const formulaireAvis = document.querySelector("form");
	formulaireAvis.addEventListener("submit", (e) => {
		e.preventDefault();
		const avis = {
			pieceId: parseInt(e.target.querySelector("[name=piece-id]").value),
			utilisateur: e.target.querySelector("[name=utilisateur]").value,
			commentaire: e.target.querySelector("[name=commentaire]").value,
			nbEtoiles: e.target.querySelector("[name=etoile]").value,
		};
		const chargeUtile = JSON.stringify(avis);
		fetch("http://localhost:8081/avis", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile,
		});
	});
}
