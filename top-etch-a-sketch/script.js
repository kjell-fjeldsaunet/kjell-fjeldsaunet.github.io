//----Get DOM elements----
const gridContainer = document.querySelector('.grid-container');
const resetBtn = document.querySelector('#reset-btn');
const hexBtn = document.querySelector('#hex-btn');
const duotrigBtn = document.querySelector('#duotrig-btn');
const customBtn = document.querySelector('#custom-btn');
const blackBtn = document.querySelector('#black-btn');
const shadeBtn = document.querySelector('#shade-btn');
const randomBtn = document.querySelector('#random-btn');
const styleButtons = document.querySelectorAll('.grid-style-btn')

console.log(styleButtons)

//----Add event listeners----
resetBtn.addEventListener('click', () => {
    clearDrawingArea();
});

hexBtn.addEventListener('click', () => {
    currentGridSize = 16;
    clearDrawingArea();
});

duotrigBtn.addEventListener('click', () => {
    currentGridSize = 32;
    clearDrawingArea();
});

customBtn.addEventListener('click', () => {
    currentGridSize = prompt('How many squares per side?', 16);
    clearDrawingArea();
});

blackBtn.addEventListener('click', (e) => {
    styleButtons.forEach(element => {
        element.classList.remove('active')
    })
    e.target.classList.add('active')
    drawingStyle = 'black';
});

shadeBtn.addEventListener('click', (e) => {
    styleButtons.forEach(element => {
        element.classList.remove('active')
    })
    e.target.classList.add('active')
    drawingStyle = 'shade';
});

randomBtn.addEventListener('click', (e) => {
    styleButtons.forEach(element => {
        element.classList.remove('active')
    })
    e.target.classList.add('active')
    drawingStyle = 'random';
});

//----Initialize----
let currentGridSize = 16;
let drawingStyle = 'black'
createDrawingArea(currentGridSize)
blackBtn.classList.add('active')

//----Functions-----
function createDrawingArea(gridSize) {
    const grid = document.createElement('div');
    grid.classList.add('grid')
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    gridContainer.appendChild(grid);
    numberOfPixels = gridSize * gridSize;
    for (let i = 0; i < numberOfPixels; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square')
        gridSquare.addEventListener('mouseover', colorGridSquare)
        grid.appendChild(gridSquare);
    }
}

function colorGridSquare(e) {
    let currentBackgroundColor = window.getComputedStyle(e.target)['background-color'];
    switch (drawingStyle) {
        case 'random':
            e.target.style.backgroundColor = randomRGB();
            break;
        case 'shade':
            e.target.style.backgroundColor = rgbShader(0.8, currentBackgroundColor);
            break;
        default:
            e.target.style.backgroundColor = 'rgb(0,0,0)'
    }
}

function clearDrawingArea() {
    gridContainer.children[0].remove();
    createDrawingArea(currentGridSize);
}

function rgbShader(p, color) {
    const colors = color.match(/[0-9]{1,3}/g);
    for (let i = 0; i < colors.length; i++) {
        colors[i] = Math.round(colors[i] * p);
    }
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`
}

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}