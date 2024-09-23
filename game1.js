const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 }; // Начальное направление (вправо)
let food = { x: 0, y: 0 };
let score = 0;

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем змейку
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen'; // Первый сегмент - голова
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    
    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    
    // Обновляем позицию змейки
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    
    // Проверка на столкновение с едой
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = `Очки: ${score}`;
        snake.unshift(head); // Добавляем новый сегмент
        createFood();
    } else {
        snake.unshift(head); // Добавляем новый сегмент
        snake.pop(); // Убираем последний сегмент
    }
    
    // Проверка на столкновение со стенами или с собой
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        alert('Игра окончена! Очки: ' + score);
        document.location.reload();
    }
}

function collision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

createFood();
setInterval(draw, 100);
document.addEventListener('keydown', changeDirection);
