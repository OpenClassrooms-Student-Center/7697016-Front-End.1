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

export function ajoutListenerEnvoyerAvis(apiAvis) {
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
		fetch(apiAvis, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile,
		});
	});
}

export async function afficherGraphique(apiAvis, label, indexAxis, domElement) {
	const api = await fetch(apiAvis).then((avis) => avis.json());
	const nb_commentaire = [0, 0, 0, 0, 0];
	for (let commentaire of api) {
		nb_commentaire[commentaire.nbEtoiles - 1]++;
	}

	const labels = ["5", "4", "3", "2", "1"];

	const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				data: nb_commentaire.reverse(),
				backgroundColor: "rgba(255,230,0,1)",
			},
		],
	};

	const config = {
		type: "bar",
		data: data,
		options: {
			indexAxis: indexAxis,
		},
	};

	const graphiqueAvis = new Chart(document.querySelector(domElement), config);
}
