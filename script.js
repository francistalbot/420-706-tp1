let animaux = [];
let isListView = true;

// Charger les données des animaux depuis le fichier JSON
fetch("animaux.json")
  .then((response) => response.json())
  .then((data) => {
    animaux = data.animaux;
    renderAnimals();
  });

function renderAnimals() {
  const animalContainer = document.getElementById("animal-container");
  animalContainer.innerHTML = animaux
    .map((animal) => {
      return `
            <div class="carte-animal ${
              animal.type
            }" onclick='afficherModal(${JSON.stringify(
        animal
      )})' data-location="${animal.localisation}">
                <img src="assets/${animal.type}.jpg" alt="${animal.nom}">
                <div class="carte-animal-info">
                <h2>${animal.nom}</h2>
                <p>Age: ${animal.age} ans</p>
                <p>Localisation: ${animal.localisation}</p>
                </div>
            </div>
        `;
    })
    .join("");
}

function toggleAnimal(type) {
  const filterButton = document.getElementById(`filter-${type}`);
  filterButton.classList.toggle("active");
  const isActive = filterButton.classList.contains("active");
  console.log(`Filtre ${type} ${isActive ? "activé" : "désactivé"}`);
  document.querySelectorAll(`.${type}`).forEach((animalCard) => {
      animalCard.classList.toggle("hidden", !isActive);
  });
}

function afficherModal(animal) {
  const modal = document.getElementById("modal");
  const details = document.getElementById("modal-details");
  details.innerHTML = `
    <div class='animal-modal'>
        <h2>${animal.nom}</h2>
        <img src="assets/${animal.type}.jpg" alt="${animal.nom}">
        <p>Type: ${animal.type}</p>
        <p>Age: ${animal.age} ans</p>
        <p>Localisation: ${animal.localisation}</p>
        <p>Description: ${animal.description}</p>
    </div>
    `;
  modal.classList.remove("hidden");
}

function fermerModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Toggle entre vue liste et grille
document.getElementById("toggle-view").addEventListener("click", function () {
  console.log(`Changement de style d'affichage !`);
  const animalContainer = document.getElementById("animal-container");
  isListView = !isListView;
  animalContainer.classList.toggle("list-view", isListView);
  animalContainer.classList.toggle("grid-view", !isListView);
  this.textContent = isListView ? "Vue en grille" : "Vue en liste";
});

// Contrôle de la taille des cartes en mode grille
document.getElementById("grid-size").addEventListener("input", function () {
  const sliderValue = this.value;
  console.log(`Taille de carte changée ! ${sliderValue}px`);
  const animalContainer = document.getElementById("animal-container");
  if (animalContainer.classList.contains("grid-view")) {
    animalContainer.style.setProperty(
      "grid-template-columns",
      `repeat(auto-fill, minmax(${sliderValue * 1.7}px, 1fr))`
    );
  }
});

// Initialisation
document.getElementById("toggle-view").textContent = "Vue en grille";
