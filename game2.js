const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let isJumping = false;
let jumpHeight = 0;
let player = { x: 50, y: 300, width: 30, height: 30 };
let items = [];
let gameInterval;

function drawBackground() {
    ctx.fillStyle = 'lightblue'; // Цвет фона
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green'; // Цвет земли
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function drawPlayer() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(player.x, player.y - jumpHeight, player.width, player.height);
}

function createItems() {
    if (Math.random() < 0.02) {
        const itemX = Math.floor(Math.random() * (canvas.width - 20));
        items.push({ x: itemX, y: 0, width: 20, height: 20 });
    }
}

function drawItems() {
    ctx.fillStyle = 'gold';
    items.forEach(item => {
        item.y += 2; // Двигаем предметы вниз
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });

    // Удаляем вышедшие за экран предметы
    items = items.filter(item => item.y < canvas.height);
}

function checkCollisions() {
    items.forEach((item, index) => {
        if (
            player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y - jumpHeight < item.y + item.height &&
            player.y - jumpHeight + player.height > item.y
        ) {
            score++;
            document.getElementById('score').textContent = `Очки: ${score}`;
            items.splice(index, 1); // Убираем собранный предмет
        }
    });
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        jumpHeight = 0;
        
        const jumpInterval = setInterval(() => {
            if (jumpHeight < 100) {
                jumpHeight += 5; // Поднимаем персонажа
            } else {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpHeight > 0) {
                        jumpHeight -= 5; // Опускаем персонажа
                    } else {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}

function gameLoop() {
    drawBackground();
    drawPlayer();
    createItems();
    drawItems();
    checkCollisions();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

function startGame() {
    gameInterval = setInterval(gameLoop, 20);
}

function resetGame() {
    score = 0;
    items = [];
    player.y = 300;
    document.getElementById('score').textContent = `Очки: ${score}`;
}

document.getElementById('resetButton').addEventListener('click', () => {
    clearInterval(gameInterval);
    resetGame();
    startGame();
});

startGame();
