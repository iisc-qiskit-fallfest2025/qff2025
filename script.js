// Countdown Timer
const targetDate = new Date("October 28, 2025 00:00:00").getTime();

function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  
  // Check if countdown elements exist (they only exist on index.html)
  if (!countdownElement) {
    return;
  }
  
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.innerText = "The Fest Has Started!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  
  if (daysEl) daysEl.innerText = days;
  if (hoursEl) hoursEl.innerText = hours;
  if (minutesEl) minutesEl.innerText = minutes;
  if (secondsEl) secondsEl.innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});