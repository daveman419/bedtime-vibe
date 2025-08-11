document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    this.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

function toggleLike(heart) {
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