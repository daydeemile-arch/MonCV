console.log("Le script est bien connecté !"); // Vérifie si le script est bien connecté
let images = document.querySelectorAll("img") // On selectionne toutes les images
images.forEach(element => {
    element.addEventListener("click", function() { // à chaque fois qu'une image est clické, on la met en plein écran
        this.requestFullscreen()
        this.addEventListener("click", function() { // si l'image est reclické, on enlève le plein écran
            document.exitFullscreen()
        })
    })
});

// Sélection de toutes les sections à animer
let sections = document.querySelectorAll(".hidden");

// Fonction qui vérifie quelles sections sont visibles
function checkSections() {
    sections.forEach(section => {
        let position = section.getBoundingClientRect().top; // position de la section par rapport au haut de l'écran
        let windowHeight = window.innerHeight; // hauteur de la fenêtre visible

        if (position < windowHeight - 100) { // si la section est à moins de 100px du bas de la fenêtre on active l'animation
            section.classList.add("visible");
        } else {
            section.classList.remove("visible"); // sinon on laisse comme d'habitude
        }
    });
}

// Exécuter la fonction au scroll
window.addEventListener("scroll", checkSections);

// Exécuter aussi au chargement initial (pour animer les sections déjà visibles)
checkSections();

// Sélection du formulaire et du message de statut
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le rechargement automatique de la page

    // Création d'un objet FormData contenant les données du formulaire
    const formData = new FormData(form);

    try {
        // Envoi des données vers Formspree avec fetch()
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = "Merci ! Votre message a bien été envoyé.";
            form.reset(); // vide le formulaire
        } else {
            status.textContent = "Une erreur est survenue, veuillez réessayer.";
        }
    } catch (error) {
        status.textContent = "Erreur réseau — impossible d’envoyer le message.";
    }
});
