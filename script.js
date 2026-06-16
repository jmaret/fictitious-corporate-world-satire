const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('.tab-panel');

function animateCards(panel = document) {
  const visibleCards = panel.querySelectorAll('.card');

  visibleCards.forEach((card, index) => {
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = `floatUp 0.9s ease ${index * 0.12}s both`;
  });
}

animateCards();

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.tabTarget;

    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === button;
      tabButton.classList.toggle('is-active', isActive);
      tabButton.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);

      if (isActive) {
        animateCards(panel);
      }
    });
  });
});

function setTheme() {
  const hour = new Date().getHours();
  document.body.classList.toggle('evening', hour >= 18 || hour < 7);
}

setTheme();

const imageModal = document.getElementById('image-modal');
const modalImage = imageModal.querySelector('.image-modal__image');

function openImageModal(image) {
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;
  imageModal.hidden = false;
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  imageModal.querySelector('.image-modal__close').focus();
}

function closeImageModal() {
  imageModal.hidden = true;
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.removeAttribute('src');
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  const image = event.target.closest('.card img, .author-thumbnail');
  if (image) {
    openImageModal(image);
  }
});

imageModal.querySelectorAll('[data-modal-close]').forEach((element) => {
  element.addEventListener('click', closeImageModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !imageModal.hidden) {
    closeImageModal();
  }
});
