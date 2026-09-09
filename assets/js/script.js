'use strict';

const sidebar = document.querySelector('[data-sidebar]');
const sidebarButton = document.querySelector('[data-sidebar-btn]');
const sidebarLabel = document.querySelector('[data-sidebar-label]');

sidebarButton.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('active');
  sidebarButton.setAttribute('aria-expanded', String(isOpen));
  sidebarLabel.textContent = isOpen ? 'Sembunyikan Kontak' : 'Tampilkan Kontak';
});

const navigationLinks = [...document.querySelectorAll('[data-nav-link]')];
const pages = [...document.querySelectorAll('[data-page]')];

function showPage(pageName, shouldScroll = false) {
  const targetPage = pages.find((page) => page.dataset.page === pageName) || pages[0];

  pages.forEach((page) => page.classList.toggle('active', page === targetPage));
  navigationLinks.forEach((link) => {
    const isActive = link.dataset.pageTarget === targetPage.dataset.page;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => showPage(link.dataset.pageTarget, true));
});

window.addEventListener('hashchange', () => showPage(window.location.hash.slice(1)));
showPage(window.location.hash.slice(1));

const filterButtons = [...document.querySelectorAll('[data-filter-btn]')];
const filterSelect = document.querySelector('[data-filter-select]');
const projectItems = [...document.querySelectorAll('[data-filter-item]')];

function filterProjects(category) {
  projectItems.forEach((item) => {
    item.classList.toggle('active', category === 'semua' || item.dataset.category === category);
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filterBtn === category;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  filterSelect.value = category;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => filterProjects(button.dataset.filterBtn));
});
filterSelect.addEventListener('change', () => filterProjects(filterSelect.value));

const modal = document.querySelector('[data-project-modal]');
const modalDialog = document.querySelector('[data-modal-dialog]');
const modalClose = document.querySelector('[data-modal-close]');
const modalOverlay = document.querySelector('[data-modal-overlay]');
const modalKicker = document.querySelector('[data-modal-kicker]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalSummary = document.querySelector('[data-modal-summary]');
const modalBody = document.querySelector('[data-modal-body]');
const modalLinks = document.querySelector('[data-modal-links]');
let modalTrigger = null;

function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  modalTrigger?.focus();
}

function openModal(projectId, trigger) {
  const template = document.querySelector(`#project-${projectId}`);
  if (!template) return;

  const content = template.content;
  modalKicker.textContent = content.querySelector('[data-kicker]').textContent;
  modalTitle.textContent = content.querySelector('[data-title]').textContent;
  modalSummary.textContent = content.querySelector('[data-summary]').textContent;
  modalBody.replaceChildren(content.querySelector('[data-body]').cloneNode(true));
  modalLinks.replaceChildren();

  content.querySelectorAll('[data-link]').forEach((link) => {
    const clonedLink = link.cloneNode(true);
    clonedLink.target = '_blank';
    clonedLink.rel = 'noopener noreferrer';
    clonedLink.removeAttribute('data-link');
    modalLinks.append(clonedLink);
  });

  modalTrigger = trigger;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modalDialog.focus();
}

document.querySelectorAll('[data-project-open]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.projectOpen, button));
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();

  if (event.key === 'Tab') {
    const focusable = [...modalDialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const contactForm = document.querySelector('[data-form]');
const formStatus = document.querySelector('[data-form-status]');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll('[required]')];
  fields.forEach((field) => field.setAttribute('aria-invalid', String(!field.validity.valid)));

  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Lengkapi semua kolom dengan data yang valid.';
    fields.find((field) => !field.validity.valid)?.focus();
    return;
  }

  formStatus.textContent = 'Pengiriman belum aktif. Silakan hubungi melalui email atau LinkedIn.';
});
