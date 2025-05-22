const gridContainer = document.querySelector('.grid-container');
const inputButton = document.querySelector('#input-button');

function createGrid(size) {
    gridContainer.style.width = `${size * 45}px`;
    gridContainer.innerHTML = '';

    let totalCells = size * size;

    for(let i = 0; i < totalCells; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');

        newCell.addEventListener('mouseover',() => {
            if(mouseDown) {
                newCell.style.backgroundColor = 'pink';
            }
        });
        gridContainer.appendChild(newCell);
    }
}

createGrid(16);

let mouseDown = false;

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});

document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});
