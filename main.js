// const n = parseInt(prompt("Tamanho do grid: "));
const n = 16;

const container = document.querySelector(".container");

for (let i = 0; i < n * n; i++) {
    const item = document.createElement("div");
    item.className = "item";
    item.style.flexBasis = `${1 / n * 100}%`;
    container.appendChild(item)
}

function paint(e) {
    if (e.target.className == "item") {
        console.log(e.target.className);
    }
}

container.addEventListener('mouseover', paint)