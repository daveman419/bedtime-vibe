// Module aliases
const Engine = Matter.Engine,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

// Create engine
const engine = Engine.create();
engine.world.gravity.y = 1;

// Array to store popcorn pieces (sparkles)
let popcornPieces = [];
const popcornBucket = document.getElementById('popcorn');
let music = new Audio('popcorn.mp3');
let hoverSound = new Audio('swishes1n.mp3');  // Sound when mouse enters
let hoverOffSound = new Audio('swishes2n.mp3');  // Sound when mouse leaves

//hoverSound.onerror = () => console.log('Error loading Swishes1.mp3');
//hoverOffSound.onerror = () => console.log('Error loading Swishes2.mp3');
hoverSound.load();
hoverOffSound.load();

// Function to create popcorn pieces (sparkles) with Matter.js physics
function createPopcornSparkles(x, y) {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const magnitude = Math.random() * 5 + 2;
        const body = Bodies.circle(x, y, 10, { 
            restitution: 0.5,
            friction: 0.1,
            render: { visible: false }
        });
        Matter.Body.setVelocity(body, {
            x: Math.cos(angle) * magnitude,
            y: Math.sin(angle) * magnitude - 7
        });

        const piece = document.createElement('img');
        piece.src = 'popcornpr.png';
        piece.className = 'popcorn-piece';
        piece.style.width = '20px';
        piece.style.height = '20px';
        document.body.appendChild(piece);

        popcornPieces.push({ body, element: piece, alpha: 255 });
        Composite.add(engine.world, body);
    }
}

// Update positions of popcorn pieces and apply gravity
function updatePopcornSparkles() {
    for (let i = popcornPieces.length - 1; i >= 0; i--) {
        const piece = popcornPieces[i];
        const pos = piece.body.position;

        piece.element.style.left = `${pos.x - 10}px`;
        piece.element.style.top = `${pos.y - 10}px`;
        piece.element.style.transform = `rotate(${piece.body.angle}rad)`;

        piece.alpha -= 1;
        piece.element.style.opacity = piece.alpha / 255;

        if (piece.alpha <= 0 || pos.y > window.innerHeight + 20) {
            document.body.removeChild(piece.element);
            Composite.remove(engine.world, piece.body);
            popcornPieces.splice(i, 1);
        }
    }
}

// Click event on popcorn bucket
// Declare timeout variable outside the event listener scope
let popcornTimeout;

popcornBucket.addEventListener('click', (e) => {
    const rect = popcornBucket.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    createPopcornSparkles(x, y);
    music.play();
    
    // Clear any existing timeout
    clearTimeout(popcornTimeout);
    
    // Change to popcorn (3) on click
    popcornBucket.src = 'popcorn (3).png';
    
    // Set new timeout and store its ID
    popcornTimeout = setTimeout(() => {
        popcornBucket.src = 'popcorn sad.png';
    }, 1900);
});

// Add hover event listeners
popcornBucket.addEventListener('mouseenter', () => {
hoverSound.currentTime = 0; // Reset to start
hoverSound.play();
});

popcornBucket.addEventListener('mouseleave', () => {
hoverOffSound.currentTime = 0; // Reset to start
hoverOffSound.play();
});

// Animation loop
function animate() {
    Engine.update(engine, 1000 / 60);
    updatePopcornSparkles();
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
