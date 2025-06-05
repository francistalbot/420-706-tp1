let animaux = [];
let isListView = true;

// Charger les données des animaux depuis le fichier JSON
fetch('animaux.json')
    .then(response => response.json())
    .then(data => {
        animaux = data.animaux;
        renderAnimals();
    });

function renderAnimals() {
    const animalContainer = document.getElementById('animal-container');
    animalContainer.innerHTML = animaux.map(animal => {
        return `
            <div class="carte-animal ${animal.type}" onclick='afficherModal(${JSON.stringify(animal)})' data-location="${animal.localisation}">
                <img src="assets/${animal.type}.jpg" alt="${animal.nom}">
                <div class="carte-animal-info">
                <h2>${animal.nom}</h2>
                <p>Age: ${animal.age} ans</p>
                <p>Localisation: ${animal.localisation}</p>
                </div>
            </div>
        `;  
    }).join('');
}

function toggleAnimal(type) {
    // document.querySelectorAll(`...`)

    console.log(`Filtre changé pour ${type}`)
}

function afficherModal(animal) {
    const modal = document.getElementById('modal');
    const details = document.getElementById('modal-details');
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
    modal.classList.remove('hidden');
}

function fermerModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Toggle entre vue liste et grille
document.getElementById('toggle-view').addEventListener('click', function() {
    console.log(`Changement de style d'affichage !`)
});

// Contrôle de la taille des cartes en mode grille
document.getElementById('grid-size').addEventListener('input', function() {
    console.log(`Taille de carte changée !`)
});

// Initialisation
document.getElementById('toggle-view').textContent = 'Vue en grille';