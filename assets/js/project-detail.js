'use strict';

document.querySelectorAll('[data-showcase]').forEach((showcase) => {
  const track = showcase.querySelector('[data-showcase-track]');
  const slides = [...showcase.querySelectorAll('[data-showcase-slide]')];
  const dots = [...showcase.querySelectorAll('[data-showcase-dot]')];
  const previousButton = showcase.querySelector('[data-showcase-prev]');
  const nextButton = showcase.querySelector('[data-showcase-next]');
  const status = showcase.querySelector('[data-showcase-status]');
  let activeIndex = 0;
  let scrollFrame = null;

  function updateControls(index) {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
    status.textContent = `Slide ${activeIndex + 1} dari ${slides.length}`;
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === activeIndex));
    });
  }

  function goToSlide(index) {
    const targetIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.scrollTo({ left: slides[targetIndex].offsetLeft, behavior: 'smooth' });
    updateControls(targetIndex);
  }

  previousButton.addEventListener('click', () => goToSlide(activeIndex - 1));
  nextButton.addEventListener('click', () => goToSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    }
  });

  track.addEventListener('scroll', () => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const nearestIndex = slides.reduce((nearest, slide, index) => {
        const currentDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
        const nearestDistance = Math.abs(slides[nearest].offsetLeft - track.scrollLeft);
        return currentDistance < nearestDistance ? index : nearest;
      }, 0);
      updateControls(nearestIndex);
    });
  }, { passive: true });

  updateControls(0);
});
