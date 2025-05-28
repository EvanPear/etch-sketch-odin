const gridContainer = document.querySelector('.grid-container');
const inputButton = document.querySelector('#input-button');
const resetButton = document.querySelector('#reset-button');
const rainbowButton = document.querySelector('#rgb-button');
const opacityButton = document.querySelector('#opacity-button');

// Returns a random color if cell background is transparent, otherwise returns current color
function getRandomColor(ele) {
    let currentColor = getComputedStyle(ele).backgroundColor;

    if(currentColor === 'rgba(0, 0, 0, 0)' || currentColor === 'transparent') {      
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      return currentColor;
    } 
}

rainbowButton.addEventListener('click', () => {
    if(!rainbowEffect) {
        rainbowEffect = true;
        rainbowButton.style.backgroundColor = 'pink';
        rainbowButton.style.color = 'white';
        rainbowButton.textContent = 'Rainbow: On'
    } else if(rainbowEffect) {
        rainbowEffect = false;
        rainbowButton.style.backgroundColor = 'white';
        rainbowButton.style.color = 'pink';
        rainbowButton.textContent = 'Rainbow: Off';
    }
});

let currentGridSize = 32;

// Creates a square grid of cells with size * size dimensions and sets grid width accordingly
function createGrid(size) {
    currentGridSize = size;
    gridContainer.style.width = `${size * 25}px`;
    gridContainer.innerHTML = '';

    let totalCells = size * size;

    for(let i = 0; i < totalCells; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');

        newCell.addEventListener('mouseover',() => {
            const bgColor = getComputedStyle(newCell).backgroundColor;

            if(mouseDown &&
                !rainbowEffect && 
                (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent')) {
                newCell.style.backgroundColor = 'pink';
            } else if (mouseDown && rainbowEffect) {
                newCell.style.backgroundColor = getRandomColor(newCell)
            }
            if(opacityActive) {
                opacityChanger(newCell);
            } else {
                newCell.style.opacity = 1;
            }
        });
        gridContainer.appendChild(newCell);
    }
}

createGrid(32);

function opacityChanger(ele) {
    // Uses the cells current opacity or sets it to 0.1 if none is set
    let currentOpacity = parseFloat(ele.style.opacity) || 0.1; 
    let newOpacity = currentOpacity + 0.1;

    if(newOpacity > 1) newOpacity = 1;
    ele.style.opacity = newOpacity;
}

let mouseDown = false; // Tracks if mouse button is currently pressed
let rainbowEffect = false; // When true, hovering colors cells with random colors instead of pink
let opacityActive = false; // When true, cells opacity slowly increase with each mouseover

// Tracks mouse button state for drawing while, mouse is held down
document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});

inputButton.addEventListener('click', () => {

    let userInput;

    do{
        userInput = 
        prompt('How many squares per side? (Max: 100)');
        if(userInput === null) return;

        userInput = parseInt(userInput);

    }while(isNaN(userInput) || userInput < 1 || userInput > 100);


    createGrid(userInput);
});

// Resets the grid to the grid to the current size and restores default button states and settings
resetButton.addEventListener('click', () => {
    createGrid(currentGridSize);
    rainbowEffect = false;
    rainbowButton.textContent = 'Rainbow'
    rainbowButton.style.backgroundColor = 'white';
    rainbowButton.style.color = 'pink';
    opacityButton.style.backgroundColor = 'white';
    opacityButton.style.color = 'pink';
    opacityButton.textContent = 'Toggle opacity';
    opacityActive = false;
});

opacityButton.addEventListener('click', () => {
    if(opacityActive) {
        opacityActive = false;
        opacityButton.style.backgroundColor = 'white';
        opacityButton.style.color = 'pink';
        opacityButton.textContent = 'Opacity: Off';
    } else {
        opacityActive = true;
        opacityButton.style.backgroundColor = 'pink';
        opacityButton.style.color = 'white';
        opacityButton.textContent = 'Opacity: On'; 
    }
});
