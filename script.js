const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
  card.style.animation = `floatUp 0.9s ease ${index * 0.12}s both`;
});

function setTheme() {
  const hour = new Date().getHours();
  document.body.classList.toggle('evening', hour >= 18 || hour < 7);
}

setTheme();
