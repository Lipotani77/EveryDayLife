const board = document.getElementById("taquin-board");
const shuffleBtn = document.getElementById("shuffle-btn");
const imageUpload = document.getElementById("image-upload");

let tiles = [];
let imageURL = null;

function createTiles(shuffleAfter = false) {
    tiles = [...Array(15).keys()].map(n => n + 1).concat(null);

    if (shuffleAfter) {
        shuffleTiles();
    }

    updateBoard();
}

function shuffleTiles() {
    let shuffled;
    do {
        shuffled = [...tiles];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    } while (!isSolvable(shuffled));
    tiles = shuffled;
}

function isSolvable(arr) {
    let invCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] && arr[j] && arr[i] > arr[j]) invCount++;
        }
    }
    const emptyRow = Math.floor(arr.indexOf(null) / 4);
    return (invCount + emptyRow) % 2 === 0;
}

function updateBoard() {
    board.innerHTML = "";
    tiles.forEach((num, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === null) {
            tile.classList.add("empty");
        } else {
            if (imageURL) {
                const row = Math.floor((num - 1) / 4);
                const col = (num - 1) % 4;
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

function canMove(index) {
    const empty = getEmptyIndex();
    const row = Math.floor(index / 4), col = index % 4;
    const emptyRow = Math.floor(empty / 4), emptyCol = empty % 4;
    return Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
}

board.addEventListener("click", e => {
    if (!e.target.classList.contains("tile")) return;

    const tilesHTML = [...board.children];
    const index = tilesHTML.indexOf(e.target);
    if (canMove(index)) {
        swap(index, getEmptyIndex());
        checkWin();
    }
});

shuffleBtn.addEventListener("click", () => {
    shuffleTiles();
    updateBoard();
});

document.addEventListener("DOMContentLoaded", () => {
    createTiles(); // only numbers initially
});

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;
            createTiles(true); // show image and shuffle
        };
        reader.readAsDataURL(file);
    }
});

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

function chooseImage(src) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        imageURL = canvas.toDataURL();
        createTiles(true);

        // Highlight the selected image
        document.querySelectorAll('.image-option').forEach(opt => opt.classList.remove('selected'));
        const selected = [...document.querySelectorAll('.image-option img')].find(img => img.src.includes(src));
        if (selected) selected.parentElement.classList.add('selected');
    };
    img.src = src;
}

