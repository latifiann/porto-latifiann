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
