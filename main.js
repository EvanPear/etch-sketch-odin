const gridContainer = document.querySelector('.grid-container');

for(let i = 0; i < 256; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
   
   cell.addEventListener('mouseover', () => {
    if (mouseDown) {
        cell.style.backgroundColor = 'pink';
    }
   });
   
    gridContainer.appendChild(cell);
}

let mouseDown = false;

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});

document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});