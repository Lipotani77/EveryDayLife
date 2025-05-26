const board = document.getElementById("taquin-board");
const shuffleBtn = document.getElementById("shuffle-btn");
const imageUpload = document.getElementById("image-upload");

let tiles = [];
let imageURL = null;

function createTiles() {
    board.innerHTML = "";
    tiles = [...Array(15).keys()].map(n => n + 1).concat(null); // 1–15 + empty
    tiles.forEach((num, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === null) {
            tile.classList.add("empty");
        } else {
            if (imageURL) {
                const row = Math.floor(i / 4);
                const col = i % 4;
                tile.style.backgroundImage = `url(${imageURL})`;
                tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            } else {
                tile.textContent = num;
            }
        }
        board.appendChild(tile);
    });
}

function getEmptyIndex() {
    return tiles.indexOf(null);
}

function swap(index1, index2) {
    [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
    updateBoard();
}

function updateBoard() {
    [...board.children].forEach((tile, i) => {
        if (tiles[i] === null) {
            tile.className = "tile empty";
            tile.style.backgroundImage = "";
            tile.textContent = "";
        } else {
            tile.className = "tile";
            if (imageURL) {
                const row = Math.floor(i / 4);
                const col = i % 4;
                tile.textContent = "";
                tile.style.backgroundImage = `url(${imageURL})`;
                tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            } else {
                tile.textContent = tiles[i];
            }
        }
    });
}

function canMove(index) {
    const empty = getEmptyIndex();
    const row = Math.floor(index / 4), col = index % 4;
    const emptyRow = Math.floor(empty / 4), emptyCol = empty % 4;
    return Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
}

board.addEventListener("click", e => {
    const tilesHTML = [...board.children];
    const index = tilesHTML.indexOf(e.target);
    if (canMove(index)) {
        swap(index, getEmptyIndex());
        checkWin();
    }
});

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    updateBoard();
}

shuffleBtn.addEventListener("click", shuffle);

document.addEventListener("DOMContentLoaded", () => {
    createTiles();
});

// For image upload
imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;
            createTiles();
        };
        reader.readAsDataURL(file);
    }
});

// For checking if won the game
function checkWin() {
    const isSolved = tiles.every((tile, index) => {
        if (index < 15) return tile === index + 1;
        return tile === null;
    });

    if (isSolved) {
        const message = document.getElementById("win-message");
        message.classList.add("show");

        setTimeout(() => {
            message.classList.remove("show");
        }, 3000);
    }
}

