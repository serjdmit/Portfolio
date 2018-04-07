const parallaxContainer = $('.hero__title')[0];
const layers = $('.section-title')[0].children;
const hero = $('.hero__user')[0];
const heroLayers = $('.hero__user')[0].children;

const moveLayers = e => {
    const initialX = window.innerWidth / 2 - e.pageX;
    const initialY = window.innerHeight / 2 - e.pageY;

    Array.from(layers).forEach((layer, i) => {
        const divider = (i + 1) / 100;
        const positionX = initialX * divider;
        const positionY = initialY * divider;
        layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
        hero.style.transform = `translate(${positionX + 0.2}px, ${positionY + 0.2}px)`;
    });

    Array.from(heroLayers).forEach((layer, i) => {
        const divider = (i + 4) / 100;
        const positionX = initialX * divider;
        const positionY = initialY * divider;
        layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
    });
};

window.addEventListener('mousemove', moveLayers);
