document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    this.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

function toggleLike(event, heart) {

    event.stopPropagation();
    let starCountEl = heart.previousElementSibling.querySelector('.star-count');
    let currentStars = parseInt(starCountEl.textContent);
    
    if (heart.classList.contains('liked')) {
        heart.classList.remove('liked');
        heart.innerHTML = "🤍"; // White heart when unliked
        starCountEl.textContent = currentStars - 1;
    } else {
        heart.classList.add('liked');
        heart.innerHTML = "❤️"; // Red heart when liked
        starCountEl.textContent = currentStars + 1;
    }
}

// Dynamically set the current year
const d = new Date();
let year = d.getFullYear(); // Use getFullYear() instead of getYear()
document.getElementById("year").textContent = year;



//Audio play

/* document.querySelectorAll('.story-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the card click event from triggering
    const btn = this;
    // Get the parent card's ID to match the audio (e.g., node-1 -> storyAudio1)
    const cardId = btn.closest('.card').getAttribute('id').replace('node-', 'storyAudio');
    const audio = document.getElementById(cardId);

    if (audio.paused) {
      audio.play();
      btn.textContent = '❚❚ Pause';
    } else {
      audio.pause();
      btn.textContent = '▶ Play';
    }
  });
});

// Example toggleLike function (assuming it exists elsewhere)
function toggleLike(event, element) {
  event.stopPropagation(); // Prevents card click
  // Your existing like toggle logic here
  console.log('Toggled like');
} */


/* let currentAudio = null; // Track the currently playing audio

document.querySelectorAll('.story-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the card click event from triggering
    const btn = this;
    const cardId = btn.closest('.card').getAttribute('id').replace('node-', 'storyAudio');
    const audio = document.getElementById(cardId);

    // Pause the currently playing audio if it exists and is not the same as the new one
    if (currentAudio && currentAudio !== audio && !currentAudio.paused) {
      currentAudio.pause();
      // Reset the button text of the previously playing audio's button
      const prevBtn = document.querySelector(`.story-btn ~ #${currentAudio.id}`).previousElementSibling;
      if (prevBtn && prevBtn.textContent === '❚❚ Pause') {
        prevBtn.textContent = '▶ Play';
      }
    }

    // Toggle the new audio
    if (audio.paused) {
      audio.play();
      btn.textContent = '❚❚ Pause';
      currentAudio = audio; // Update the current audio reference
    } else {
      audio.pause();
      btn.textContent = '▶ Play';
      currentAudio = null; // Clear the reference if paused
    }
  });
});

// Example toggleLike function (assuming it exists elsewhere)
function toggleLike(event, element) {
  event.stopPropagation(); // Prevents card click
  // Your existing like toggle logic here
  console.log('Toggled like');
} */


//Audio play, with button reset chatgpt did the better code than grok

let currentAudio = null;
let currentButton = null;

document.querySelectorAll('.story-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation();
    const btn = this;
    const cardId = btn.closest('.card').getAttribute('id').replace('node-', 'storyAudio');
    const audio = document.getElementById(cardId);

    // If clicking a different audio button while another is playing
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset to start if needed
      if (currentButton) currentButton.textContent = '▶ Play';
    }

    // If clicking the same button that's already playing
    if (currentAudio === audio && !audio.paused) {
      audio.pause();
      btn.textContent = '▶ Play';
      currentAudio = null;
      currentButton = null;
    } else {
      audio.play();
      btn.textContent = '❚❚ Pause';
      currentAudio = audio;
      currentButton = btn;
    }
    //sparkles trigger
    triggerSparkles(btn);

  });
});


//Sparkles

function triggerSparkles(button) {
  const sparkles = button.querySelectorAll('.sparkle');
  sparkles.forEach(sparkle => {
    sparkle.style.animation = 'none'; // Reset animation
    sparkle.offsetHeight; // Force reflow
    sparkle.style.animation = ''; // Restart animation
  });
}


const container = document.getElementById('particle-container');
let particles = [];
let animating = false;

function createParticles(count = 30) {
  clearParticles();
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${4 + Math.random() * 3}s`;
    p.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(p);
    particles.push(p);
  }
}

function clearParticles() {
  particles.forEach(p => p.remove());
  particles = [];
}

document.body.addEventListener('mouseenter', () => {
  if (!animating) {
    createParticles();
    animating = true;
  }
});

document.body.addEventListener('mouseleave', () => {
  clearParticles();
  animating = false;
});


//Trails for mouse

/* const trailContainer = document.getElementById('trail-container');
const colors = ['#ff4d4d', '#ff9a00', '#ffe600', '#6eff00', '#00ffd0', '#0099ff', '#b266ff'];

function createTrailDot(x, y) {
  const dot = document.createElement('div');
  dot.classList.add('trail-dot');
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  trailContainer.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 800);
}

// Mouse movement
document.addEventListener('mousemove', e => {
  createTrailDot(e.clientX, e.clientY);
});

// Touch movement
document.addEventListener('touchmove', e => {
  for (let touch of e.touches) {
    createTrailDot(touch.clientX, touch.clientY);
  }
});
 */

//Trail updated

/* const trailContainer = document.getElementById('trail-container');
const colors = ['#ff4d4d', '#ff9a00', '#ffe600', '#6eff00', '#00ffd0', '#0099ff', '#b266ff'];

function createTrailDot(x, y) {
  const dot = document.createElement('div');
  dot.classList.add('trail-dot');
  dot.innerText = '✨'; // or '⭐'
  dot.style.fontSize = '14px';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.background = 'none'; // Remove color bg
  trailContainer.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 800);
}


// Mouse movement
document.addEventListener('mousemove', e => {
  createTrailDot(e.clientX, e.clientY);
});

// Touch movement
document.addEventListener('touchmove', e => {
  for (let touch of e.touches) {
    createTrailDot(touch.clientX, touch.clientY);
  }
});
 */