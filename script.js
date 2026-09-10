/* Update these fields whenever a new change is deployed. */
const SITE_VERSION = {
  version: '1.22',
  notes:
    'Added a shared version info control in the nav. Latest content update: cartoon_ci_25, cartoon_ci_24, and cartoon_ci_23 as the first row on the Civilian Life Satire tab.',
  deployedLabel: 'September 10, 2026, 1:35 PM IST (UTC+5:30)',
};

const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('.tab-panel');

const versionButton = document.getElementById('version-button');
const versionPopover = document.getElementById('version-popover');

function populateVersionInfo() {
  document.getElementById('version-number').textContent = SITE_VERSION.version;
  document.getElementById('version-notes').textContent = SITE_VERSION.notes;
  document.getElementById('version-deployed').textContent = SITE_VERSION.deployedLabel;
  versionButton.setAttribute(
    'title',
    `Version ${SITE_VERSION.version} · Deployed ${SITE_VERSION.deployedLabel}`
  );
}

function openVersionPopover() {
  versionPopover.hidden = false;
  versionButton.setAttribute('aria-expanded', 'true');
}

function closeVersionPopover() {
  if (versionPopover.hidden) {
    return;
  }

  versionPopover.hidden = true;
  versionButton.setAttribute('aria-expanded', 'false');
}

function toggleVersionPopover() {
  if (versionPopover.hidden) {
    openVersionPopover();
  } else {
    closeVersionPopover();
  }
}

populateVersionInfo();

versionButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVersionPopover();
});

document.addEventListener('click', (event) => {
  if (!versionPopover.hidden && !event.target.closest('.version-control')) {
    closeVersionPopover();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !versionPopover.hidden) {
    closeVersionPopover();
    versionButton.focus();
  }
});

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
