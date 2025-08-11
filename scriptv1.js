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

/* document.getElementById('playPauseBtn').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevents the card click event from triggering
  const btn = this;
  const audio = document.getElementById('storyAudio');

  if (btn.textContent === 'Play') {
    audio.play();
    btn.textContent = 'Pause';
    console.log('Playing');
  } else {
    audio.pause();
    btn.textContent = 'Play';
    console.log('Paused');
  }
});

// Example toggleLike function (assuming it exists elsewhere)
function toggleLike(event, element) {
  event.stopPropagation(); // Prevents card click
  // Your existing like toggle logic here
  console.log('Toggled like');
} */



document.querySelectorAll('.story-btn').forEach(button => {
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
}







// // script.js (add at the end)
// const storyCards = document.querySelectorAll('.card');

// storyCards.forEach(card => {
//     card.addEventListener('click', () => {
//         // Close all other cards
//         storyCards.forEach(otherCard => {
//             if (otherCard !== card) {
//                 otherCard.classList.remove('is-open');
//             }
//         });
//         // Toggle the clicked card
//         card.classList.toggle('is-open');
//     });
// });

// function toggleStory(clickedCard) {
//   // Collapse any currently open card
//   const expanded = document.querySelector('.card-container.expanded');
//   if (expanded && expanded !== clickedCard.parentElement) {
//     expanded.classList.remove('expanded');
//   }

//   // Toggle clicked card's expansion
//   clickedCard.parentElement.classList.toggle('expanded');
// }

// // Optional: stop heart click from triggering story toggle
// function toggleLike(event, heartElement) {
//   event.stopPropagation();
//   heartElement.textContent = heartElement.textContent === '🤍' ? '❤️' : '🤍';
// }