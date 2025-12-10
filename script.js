console.log("Le script est bien connecté !");

// -------------------
// GESTION DE L'ALBUM PHOTO EN PLEIN ÉCRAN
// -------------------
let images = document.querySelectorAll("img");
images.forEach(element => {
    element.addEventListener("click", function() {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        }

        // Sortie du plein écran au second clic
        this.addEventListener("click", function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }, { once: true }); // L'événement se déclenche une seule fois pour éviter des doublons
    });
});

// -------------------
// ANIMATION DES SECTIONS AU SCROLL
// -------------------
let sections = document.querySelectorAll(".hidden");

function checkSections() {
    sections.forEach(section => {
        let position = section.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {
            section.classList.add("visible");
        } else {
            section.classList.remove("visible");
        }
    });
}

window.addEventListener("scroll", checkSections);
checkSections(); // Au chargement initial

// -------------------
// FORMULAIRE DE CONTACT (uniquement si présent)
// -------------------
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form && status) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "Merci ! Votre message a bien été envoyé.";
                form.reset();
            } else {
                status.textContent = "Une erreur est survenue, veuillez réessayer.";
            }
        } catch (error) {
            status.textContent = "Erreur réseau — impossible d’envoyer le message.";
        }
    });
}

// -------------------
// BOUTON CHANGEMENT DE THÈME (sombre / clair)
// -------------------
const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

if (toggleBtn && icon) {
    // Gestion du clic
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            icon.textContent = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            icon.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });

    // Application du thème sauvegardé au chargement
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
        icon.textContent = "☀️";
    } else {
        document.body.classList.remove("light");
        icon.textContent = "🌙";
    }
}
