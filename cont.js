// Пример кода для cont.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Контент загружен и готов к использованию.");
});
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let fruits = [];
let score = 0;

function createFruit() {
    const x = Math.random() * (canvas.width - 30);
    fruits.push({ x: x, y: 0 });
}

function drawFruits() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruits.forEach(fruit => {
        ctx.beginPath();
        ctx.arc(fruit.x, fruit.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'red'; // Цвет фрукта
        ctx.fill();
        ctx.closePath();
        fruit.y += 2; // Скорость падения
    });
    fruits = fruits.filter(fruit => fruit.y < canvas.height);
}

function checkCollision(x, y) {
    fruits.forEach((fruit, index) => {
        const dist = Math.sqrt((x - fruit.x) ** 2 + (y - fruit.y)
