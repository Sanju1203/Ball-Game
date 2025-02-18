// Select the canvas and set up the game context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

// Basket properties
let basket = {
    x: 175,
    y: 450,
    width: 50,
    height: 20,
    speed: 20
};

// Falling object properties
let apple = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: 3
};

let score = 0;

// Move basket with arrow keys
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && basket.x > 0) {
        basket.x -= basket.speed;
    }
    if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
        basket.x += basket.speed;
    }
});

// Update the game frame
function update() {
    apple.y += apple.speed;

    // If apple reaches the bottom, reset position
    if (apple.y > canvas.height) {
        apple.y = 0;
        apple.x = Math.random() * (canvas.width - apple.width);
    }

    // Check collision with basket
    if (
        apple.x < basket.x + basket.width &&
        apple.x + apple.width > basket.x &&
        apple.y < basket.y + basket.height &&
        apple.y + apple.height > basket.y
    ) {
        score++;
        apple.y = 0;
        apple.x = Math.random() * (canvas.width - apple.width);
    }
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw basket
    ctx.fillStyle = "brown";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Draw apple
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(apple.x + apple.width / 2, apple.y + apple.height / 2, apple.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
