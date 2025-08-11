
// Module aliases
const Engine = Matter.Engine,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

// Create engine
const engine = Engine.create();
engine.world.gravity.y = 1; // Ensure gravity is applied

// Array to store popcorn pieces (sparkles)
let popcornPieces = [];

// Popcorn bucket element
const popcornBucket = document.getElementById('popcorn');

// Function to create popcorn pieces (sparkles) with Matter.js physics
function createPopcornSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        // Create a Matter.js body (invisible, for physics only)
        const angle = Math.random() * Math.PI * 2;
        const magnitude = Math.random() * 5 + 5; // Random speed between 5 and 10
        const body = Bodies.circle(x, y, 10, { 
            restitution: 0.5, // Bounciness
            friction: 0.1,
            render: { visible: false } // Invisible in Matter.js render
        });
        Matter.Body.setVelocity(body, {
            x: Math.cos(angle) * magnitude,
            y: Math.sin(angle) * magnitude - 5 // Slight upward push
        });

        // Create an HTML element for the popcorn piece
        const piece = document.createElement('img');
        piece.src = 'img/1/popcornpr.png';
        piece.className = 'popcorn-piece';
        piece.style.width = '20px'; // Adjust size as needed
        piece.style.height = '20px';
        document.body.appendChild(piece);

        // Store the body and element together
        popcornPieces.push({ body, element: piece, alpha: 255 });
        Composite.add(engine.world, body);
    }
}

// Update positions of popcorn pieces and apply gravity
function updatePopcornSparkles() {
    for (let i = popcornPieces.length - 1; i >= 0; i--) {
        const piece = popcornPieces[i];
        const pos = piece.body.position;

        // Update HTML element position
        piece.element.style.left = `${pos.x - 10}px`; // Center the image
        piece.element.style.top = `${pos.y - 10}px`;
        piece.element.style.transform = `rotate(${piece.body.angle}rad)`;

        // Fade out effect
        piece.alpha -= 5;
        piece.element.style.opacity = piece.alpha / 255;

        // Remove if faded out or off-screen
        if (piece.alpha <= 0 || pos.y > window.innerHeight + 20) {
            document.body.removeChild(piece.element);
            Composite.remove(engine.world, piece.body);
            popcornPieces.splice(i, 1);
        }
    }
}

// Click event on popcorn bucket
popcornBucket.addEventListener('click', (e) => {
    const rect = popcornBucket.getBoundingClientRect();
    const x = rect.left + rect.width / 2; // Center of the bucket
    const y = rect.top; // Top of the bucket
    createPopcornSparkles(x, y);
});

// Animation loop
function animate() {
    Engine.update(engine, 1000 / 60); // Update physics at 60 FPS
    updatePopcornSparkles();
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();