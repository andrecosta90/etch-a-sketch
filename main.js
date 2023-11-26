// Constants
const OPTIONS = ["white", "black", "rgb", "special"];

// DOM Elements
const container = document.querySelector(".container");
const gridSlider = document.querySelector(".grid-size");
const gridTitle = document.querySelector(".grid-title");
const gridMode = document.querySelector(".grid-mode");

// Variables
let gridSize = 16;
let coloringFunction = getBlackMode;
let darkeningEffect = 0;

// Initialize
createGrid(gridSize, container);

// Functions
function createGrid(n, container) {

    for (let i = 0; i < n * n; i++) {
        const item = document.createElement("div");
        item.className = "item";
        item.style.flexBasis = `${1 / n * 100}%`;
        container.appendChild(item);
    }
}

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

function getWhiteMode() {
    return "white";
}

function getBlackMode() {
    return "black";
}

function getRGBMode() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

function getSpecialMode() {
    if (darkeningEffect > 1) {
        darkeningEffect = 0;
    }
    darkeningEffect += 0.01;
    return `rgba(0, 0, 0, ${darkeningEffect})`;
}

function paint(event) {
    if (event.target.className !== "item") return;

    event.target.style.backgroundColor = coloringFunction();

}

function changeBehavior(option) {
    switch (option) {
        case 'black':
            coloringFunction = getBlackMode;
            break;
        case 'white':
            coloringFunction = getWhiteMode;
            break;
        case 'rgb':
            coloringFunction = getRGBMode;
            break;
        case 'special':
            coloringFunction = getSpecialMode;
            break;
        default:
            throw new Error("Invalid option");

    }
}

function disposeGrid(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

function createBrandNewGrid(container, gridSize) {
    disposeGrid(container);
    createGrid(gridSize, container);
}

let isMouseDown = false;

// Event Listeners
container.addEventListener('mousedown', (event) => {
    event.preventDefault();
    isMouseDown = true;
    paint(event);
});

container.addEventListener('mouseup', (event) => {
    isMouseDown = false;
});

container.addEventListener('mouseleave', (event) => {
    isMouseDown = false;
});

container.addEventListener('mouseover', (event) => {
    
    if (isMouseDown === true) {
        paint(event);
    }
});


gridSlider.addEventListener('change', (event) => {
    gridSize = parseInt(event.target.value);
    gridTitle.textContent = `${gridSize} x ${gridSize}`;

    darkeningEffect = 0;

    createBrandNewGrid(container, gridSize);
});

gridMode.addEventListener('mousedown', (event) => {
    darkeningEffect = 0;

    const option = event.target.getAttribute("eas-option");
    if (option === "eraser") {
        createBrandNewGrid(container, gridSize);
        return;
    }

    if (!OPTIONS.includes(option)) return;
    changeBehavior(option)
});
