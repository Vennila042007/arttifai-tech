
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bubbles = [];
let score = 0;

function createBubble(x, y, color) {
  return { x, y, radius: 20, color };
}

function spawnBubble() {
  const colors = ["red", "blue", "green", "yellow"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = canvas.width / 2;
  const y = canvas.height - 30;
  bubbles.push(createBubble(x, y, color));
}

function drawBubbles() {
  bubbles.forEach(bubble => {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.closePath();
  });
}

function shootBubble() {
  if (bubbles.length > 0) {
    let b = bubbles[0];
    b.y -= 10;
    if (b.y < 100) {
      score += 10;
      bubbles.shift();
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBubbles();
  document.getElementById("scoreBoard").textContent = `Score: ${score}`;
  requestAnimationFrame(update);
}

canvas.addEventListener("click", shootBubble);
spawnBubble();
update();
