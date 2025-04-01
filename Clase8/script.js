const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = gridSize;
let dy = 0;
let score = 0;
let changingDirection = false;
let speed = 100;
let snakeColor = "green";

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;
    
    const { key } = event;
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

function update() {
    changingDirection = false;
    
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
        score++;
        speed = Math.max(50, speed - 5);
        snakeColor = getRandomColor();
    } else {
        snake.pop();
    }
    
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }
    
    snake.unshift(head);
}

function checkCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
    
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, speed);
}

gameLoop();