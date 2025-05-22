const gridContainer = document.querySelector('.grid-container');
const inputButton = document.querySelector('#input-button');
const resetButton = document.querySelector('#reset-button');
const rainbowButton = document.querySelector('#rgb-button');

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

rainbowButton.addEventListener('click', () => {
    if(rainbowEffect === false) {
        rainbowEffect = true;
        rainbowButton.style.backgroundColor = 'pink';
        rainbowButton.style.color = 'white';
        rainbowButton.textContent = 'Rainbow: On'
    } else if (rainbowEffect === true) {
        rainbowEffect = false;
        rainbowButton.style.backgroundColor = 'white';
        rainbowButton.style.color = 'pink';
        rainbowButton.textContent = 'Rainbow: Off';
    }
});

function createGrid(size) {
    currentGridSize = size;
    gridContainer.style.width = `${size * 45}px`;
    gridContainer.innerHTML = '';

    let totalCells = size * size;

    for(let i = 0; i < totalCells; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');

        newCell.addEventListener('mouseover',() => {
            if(mouseDown && rainbowEffect === false) {
                newCell.style.backgroundColor = 'pink';
            } else if (mouseDown && rainbowEffect === true) {
                newCell.style.backgroundColor = getRandomColor()
            }
        });
        gridContainer.appendChild(newCell);
    }
}

createGrid(16);

let mouseDown = false;
let rainbowEffect = false;

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
        parseInt(prompt('How many squares per side? (Max: 100)'));
    }while(isNaN(userInput) || userInput < 1 || userInput > 100);


    createGrid(userInput);
});

resetButton.addEventListener('click', () => {
    createGrid(currentGridSize);
    rainbowEffect = false;
    rainbowButton.textContent = 'Rainbow'
    rainbowButton.style.backgroundColor = 'white';
    rainbowButton.style.color = 'pink';
});
