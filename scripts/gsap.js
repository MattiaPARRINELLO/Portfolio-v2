
// gsap.from("h1", {
//     duration: 1.5,
//     y: 50,
//     opacity: 0,
//     scale: 0.8,
//     rotationX: -20,
//     ease: "expo.out",
//     delay: 0.5
// });

let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;

    const moveX = (x / width - 0.5) * 30; // Déplacement horizontal
    const moveY = (y / height - 0.5) * 30; // Déplacement vertical

    // Décomposition de la couleur #523e27 en RGB (82, 62, 39)
    const baseColor = { r: 82, g: 62, b: 39 };
    const colorVariation = 255; // Amplitude du changement de couleur

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
})




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
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
})

const logo = document.getElementById('logoMP');
const paths = logo.querySelectorAll('path');
const homeSection = document.getElementById('home_page_section');
const introText = document.querySelector('#home_page_section h1');
const presText = document.querySelector('#home_page_section h2');
const moreInfoText = document.querySelector('#en_savoir_plus');

// Calcule les longueurs des traits
paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
});

// Masquer le contenu sauf le logo
gsap.set([introText, presText, moreInfoText], { opacity: 0 });

// Faire grandir le logo pour qu'il cache tout
gsap.to(logo, {
    scale: 9,  // Augmenter la taille du logo pour qu'il couvre bien l'écran
    duration: 1,
    ease: 'power2.inOut'
});

const logoTL = gsap.timeline();

logoTL
    .to(logo, { autoAlpha: 1 }) // Rendre le logo visible
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
        scale: 1.1,  // Réduire le logo à sa taille finale (plus grand que l'état initial)
        duration: 2,  // L'animation devient plus lente
        ease: 'power4.inOut',  // Un easing plus doux pour une transition fluide
        top: '7%',  // Remettre le logo à une position plus haute dans l'écran
        left: '50%',
        transform: 'translate(-50%, -50%)',  // Garder le logo centré
    })
    .to([introText, presText, moreInfoText], {
        opacity: 1,  // Révéler les éléments de texte
        duration: 0.5
    }, "-=1");






window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};








gsap.registerPlugin(ScrollTrigger);

// Animation de la section showcase
gsap.from("#showcase", {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#showcase",
        start: "top 80%", // Déclenchement lorsque 80% de la section est visible
        toggleActions: "play none none reverse"
    }
});

// Animation des éléments de la grille
gsap.from(".gridElement", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#showcase",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});


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

        // Rétrécir les autres éléments
        gsap.to(gridElements, {
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Garder l'élément survolé à la bonne taille
        gsap.to(element, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    element.addEventListener("mouseleave", () => {
        // Remettre tout à la taille normale
        gsap.to(gridElements, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
    });
});