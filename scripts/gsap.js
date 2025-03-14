// gsap.from("h1", {
//     duration: 1.5,
//     y: 50,
//     opacity: 0,
//     scale: 0.8,
//     rotationX: -20,
//     ease: "expo.out",
//     delay: 0.5
// });


const scroll_animation_start = "top 150%";
const scroll_animation_end = "bottom 60%";
const scroll_animation_duration = 10

// Animation des titres en fonction de la position de la souris
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;

    const moveX = (x / width - 0.5) * 100; // Déplacement horizontal
    const moveY = (y / height - 0.5) * 100;  // Déplacement vertical

    // Décomposition de la couleur #523e27 en RGB (82, 62, 39)
    const baseColor = { r: 82, g: 62, b: 39 };
    const colorVariation = 50; // Amplitude du changement de couleur

    const newR = baseColor.r + (moveX / 30) * colorVariation;
    const newG = baseColor.g + (moveY / 30) * colorVariation;
    const newB = baseColor.b + ((moveX + moveY) / 60) * colorVariation;

    gsap.to(h1, {
        x: moveX,
        y: moveY,
        color: `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`,
        duration: 0.5,
        ease: "power1.out"
    });
    gsap.to(h2, {
        x: moveX,
        y: moveY,
        color: `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`,
        duration: 0.5,
        ease: "power1.out"
    });
});

// Animation des traits du bouton "En savoir plus"
gsap.to(".path_en_savoir_plus", {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out",
    repeat: -1,
    yoyo: true,
    stagger: 0.2
});

// Animation du logo
document.addEventListener('DOMContentLoaded', () => {
    // Réinitialisation de la position de scroll
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

const logo = document.getElementById('logoMP');
const paths = logo.querySelectorAll('path');
const introText = document.querySelector('#home_page_section h1');
const presText = document.querySelector('#home_page_section h2');
const moreInfoText = document.querySelector('#en_savoir_plus');

// Calculer et appliquer la longueur des traits pour l'animation du tracé
paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
});

// Masquer le contenu textuel du header (hors logo)
gsap.set([introText, presText, moreInfoText], { opacity: 0 });

// Agrandir temporairement le logo pour couvrir l'écran
gsap.to(logo, {
    scale: 9,
    duration: 1,
    ease: 'power2.inOut'
});

// Timeline d'animation pour le logo et la révélation du contenu
const logoTL = gsap.timeline();

logoTL
    .to(logo, { autoAlpha: 1 }) // Afficher le logo
    .to(paths, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        stagger: 0.4
    })
    .to(paths, {
        fill: '#523e27',
        duration: 1,
        ease: 'power2.inOut'
    }, "-=1.5")
    .to(logo, {
        scale: 1.1,         // Réduire le logo à une taille finale plus grande qu'à l'état initial
        duration: 2,
        ease: 'power4.inOut',
        top: '7%',          // Repositionner le logo plus haut
        left: '50%',
        transform: 'translate(-50%, -50%)'
    })
    .to([introText, presText, moreInfoText], {
        opacity: 1,
        duration: 0.5
    }, "-=1");

// Remise à zéro du scroll au rechargement
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

// -----------------------------
// Animations synchronisées avec le scroll (scrub: true)
// -----------------------------

// Section "Showcase"
gsap.from("#showcase", {
    opacity: 0,
    y: 100,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#showcase",
        start: scroll_animation_start, // Déclenchement plus tard
        scrub: true,     // L'animation suit le scroll
        end: scroll_animation_end
    }
});

gsap.from(".gridElement", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#showcase",
        start: scroll_animation_start,
        scrub: true,
        end: scroll_animation_end
    }
});

// Animation de survol des images de la grille
const gridElements = document.querySelectorAll(".imageElement");

gridElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        // Agrandir l'élément survolé
        gsap.to(element, {
            scale: 1.1,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });

        // Réduire les autres éléments
        gsap.to(gridElements, {
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Maintenir la taille de l'élément survolé
        gsap.to(element, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    element.addEventListener("mouseleave", () => {
        // Remise à l'échelle normale
        gsap.to(gridElements, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
    });
});

// Section "À propos de moi"
gsap.from("#about_me .text", {
    x: -100,
    opacity: 0,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about_me",
        start: scroll_animation_start, // Déclenchement plus tard
        scrub: true,    // Animation liée au défilement
        end: scroll_animation_end
    }
});

gsap.from("#about_me .imageContainer", {
    x: 100,
    opacity: 0,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about_me",
        start: scroll_animation_start,
        scrub: true,
        end: scroll_animation_end
    }
});

// Section "Mes principales passions"
gsap.from("#passions h4", {
    y: 50,
    opacity: 0,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#passions",
        start: scroll_animation_start, // Déclenchement plus tard
        scrub: true,     // Animation contrôlée par le scroll
        end: scroll_animation_end
    }
});

gsap.from("#passions .container .item", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: scroll_animation_duration,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#passions",
        start: scroll_animation_start,
        scrub: true,
        end: scroll_animation_end
    }
});
