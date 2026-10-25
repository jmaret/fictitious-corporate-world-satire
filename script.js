/* Update these fields on EVERY release merged to main. */
const SITE_VERSION = {
  version: '1.37',
  notes:
    'The Tomorrow Tax solo lead card; Mountain and the Pebbles leads a three-card second row with Elastic Hour and Borrowed Constellations; cartoon_rc_07 added.',
  deployedLabel: 'October 24, 2026, 9:58 PM PDT (UTC-7)',
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
const modalPending = document.getElementById('image-modal-pending');
const modalPendingTitle = document.getElementById('image-modal-pending-title');
const modalEssay = document.getElementById('image-modal-essay');

function resetModalContent() {
  modalImage.hidden = true;
  modalImage.removeAttribute('src');
  modalImage.alt = '';
  modalPending.hidden = true;
  modalPendingTitle.textContent = '';
  modalEssay.hidden = true;
  modalEssay.replaceChildren();
}

function openImageModal(image) {
  resetModalContent();
  modalImage.hidden = false;
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;
  imageModal.hidden = false;
  imageModal.setAttribute('aria-hidden', 'false');
  imageModal.setAttribute('aria-label', 'Enlarged cartoon');
  document.body.style.overflow = 'hidden';
  imageModal.querySelector('.image-modal__close').focus();
}

function openCartoonLightbox({ title, src, isPending = false }) {
  resetModalContent();
  imageModal.hidden = false;
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (isPending || !src) {
    modalPending.hidden = false;
    modalPendingTitle.textContent = title;
    imageModal.setAttribute('aria-label', `${title}. Illustration forthcoming`);
  } else {
    modalImage.hidden = false;
    modalImage.src = src;
    modalImage.alt = `Cartoon: ${title}`;
    imageModal.setAttribute('aria-label', `Enlarged cartoon: ${title}`);
  }

  imageModal.querySelector('.image-modal__close').focus();
}

function openCartoonFromCard(card) {
  openCartoonLightbox({
    title: card.dataset.cartoonTitle || card.querySelector('h3')?.textContent || 'Cartoon',
    src: card.dataset.cartoonSrc,
    isPending: card.hasAttribute('data-cartoon-pending'),
  });
}

function openEssayFromCard(card) {
  const essayId = card.dataset.essayId;
  const template = essayId ? document.getElementById(essayId) : null;
  const title = card.querySelector('h3')?.textContent || 'Essay';

  if (!template) {
    return;
  }

  resetModalContent();
  modalEssay.appendChild(template.content.cloneNode(true));
  modalEssay.hidden = false;
  imageModal.hidden = false;
  imageModal.setAttribute('aria-hidden', 'false');
  imageModal.setAttribute('aria-label', title);
  document.body.style.overflow = 'hidden';
  imageModal.querySelector('.image-modal__close').focus();
}

function closeImageModal() {
  imageModal.hidden = true;
  imageModal.setAttribute('aria-hidden', 'true');
  imageModal.setAttribute('aria-label', 'Enlarged cartoon');
  resetModalContent();
  modalImage.hidden = false;
  document.body.style.overflow = '';
}

function openChronicleCard(card) {
  if (card.hasAttribute('data-open-essay')) {
    openEssayFromCard(card);
    return;
  }

  if (card.hasAttribute('data-open-cartoon')) {
    openCartoonFromCard(card);
  }
}

function openEssayFromControl(control) {
  const card = control.closest('.card');
  if (!card) {
    return;
  }

  openEssayFromCard(card);
}

function openCartoonFromControl(control) {
  const card = control.closest('.card');
  openCartoonLightbox({
    title:
      card?.dataset.cartoonTitle ||
      card?.querySelector('h3')?.textContent ||
      'Cartoon',
    src: card?.dataset.cartoonSrc || control.dataset.cartoonSrc,
    isPending: false,
  });
}

document.addEventListener('click', (event) => {
  const viewEssay = event.target.closest('[data-view-essay]');
  if (viewEssay) {
    event.preventDefault();
    event.stopPropagation();
    openEssayFromControl(viewEssay);
    return;
  }

  const viewCartoon = event.target.closest('[data-view-cartoon]');
  if (viewCartoon) {
    event.preventDefault();
    event.stopPropagation();
    openCartoonFromControl(viewCartoon);
    return;
  }

  const chronicleCard = event.target.closest('[data-open-cartoon], [data-open-essay]');
  if (chronicleCard) {
    openChronicleCard(chronicleCard);
    return;
  }

  const image = event.target.closest('.card img, .author-thumbnail');
  if (image) {
    openImageModal(image);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  const viewEssay = event.target.closest('[data-view-essay]');
  if (viewEssay && event.target === viewEssay) {
    event.preventDefault();
    event.stopPropagation();
    openEssayFromControl(viewEssay);
    return;
  }

  const viewCartoon = event.target.closest('[data-view-cartoon]');
  if (viewCartoon && event.target === viewCartoon) {
    event.preventDefault();
    event.stopPropagation();
    openCartoonFromControl(viewCartoon);
    return;
  }

  const chronicleCard = event.target.closest('[data-open-cartoon], [data-open-essay]');
  if (!chronicleCard || event.target !== chronicleCard) {
    return;
  }

  event.preventDefault();
  openChronicleCard(chronicleCard);
});

imageModal.querySelectorAll('[data-modal-close]').forEach((element) => {
  element.addEventListener('click', closeImageModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !imageModal.hidden) {
    closeImageModal();
  }
});
