const OPTIONS = ["white", "black", "rgb", "special"];

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
    // container.innerHTML = "";
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

function clip(value) {
    return Math.min(100, Math.max(2, value));
}

function createBrandNewGrid(container, gridSize) {
    disposeGrid(container);
    createGrid(gridSize, container);
}

const container = document.querySelector(".container");
const gridSlider = document.querySelector(".grid-size");
const gridTitle = document.querySelector(".grid-title");
const gridMode = document.querySelector(".grid-mode");

let gridSize = 16;

let coloringFunction = getBlackMode;
let darkeningEffect = 0;

createGrid(gridSize, container);



// Event Listeners

container.addEventListener('mouseover', paint)


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
