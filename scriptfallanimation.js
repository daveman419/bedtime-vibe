// Guest list array
var guestList = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];

// Add an event listener for the form submission
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the name from the input field
  var userName = document.getElementById("lastName").value.trim();

  // Validate input
  if (userName === "") {
    alert("Please enter your name.");
    return;
  }

  // Check if the name is on the guest list
  if (guestList.includes(userName)) {
    alert("Welcome, " + userName + "! You are on the guest list.");
  } else {
    alert("Sorry, " + userName + ". You are not on the guest list.");
  }
});

const stars = document.querySelectorAll('.star');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = this.dataset.value;
    stars.forEach((s, index) => {
      setTimeout(() => {
        s.classList.toggle('active', index < rating);
      }, index * 100); // Add a small delay for smooth animation
    });
  });
});

document.getElementById('startAnimation').addEventListener('click', () => {
    const container = document.getElementById('featherContainer');
    for (let i = 0; i < 10; i++) {
      const feather = document.createElement('div');
      feather.classList.add('feather');
      feather.style.left = `${Math.random() * 100}%`;
      container.appendChild(feather);
    }
  });
