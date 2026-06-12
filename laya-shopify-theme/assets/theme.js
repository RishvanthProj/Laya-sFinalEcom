
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const setBodyLock = () => {
    const hasOpenPanel = document.querySelector('.laya-drawer.is-open, .laya-search-panel.is-open');
    body.classList.toggle('laya-lock-scroll', Boolean(hasOpenPanel));
  };

  document.querySelectorAll('[data-open-drawer]').forEach((button) => {
    button.addEventListener('click', () => {
      const drawer = document.querySelector('[data-mobile-drawer]');
      const searchPanel = document.querySelector('[data-search-panel]');
      if (searchPanel) searchPanel.classList.remove('is-open');
      if (drawer) drawer.classList.add('is-open');
      setBodyLock();
    });
  });

  document.querySelectorAll('[data-close-drawer]').forEach((button) => {
    button.addEventListener('click', () => {
      const drawer = document.querySelector('[data-mobile-drawer]');
      if (drawer) drawer.classList.remove('is-open');
      setBodyLock();
    });
  });

  document.querySelectorAll('[data-open-search]').forEach((button) => {
    button.addEventListener('click', () => {
      const drawer = document.querySelector('[data-mobile-drawer]');
      const searchPanel = document.querySelector('[data-search-panel]');
      if (drawer) drawer.classList.remove('is-open');
      if (searchPanel) {
        searchPanel.classList.add('is-open');
        const input = searchPanel.querySelector('input[type="search"]');
        if (input) window.setTimeout(() => input.focus(), 40);
      }
      setBodyLock();
    });
  });

  document.querySelectorAll('[data-close-search]').forEach((button) => {
    button.addEventListener('click', () => {
      const searchPanel = document.querySelector('[data-search-panel]');
      if (searchPanel) searchPanel.classList.remove('is-open');
      setBodyLock();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.laya-drawer.is-open, .laya-search-panel.is-open').forEach((panel) => {
      panel.classList.remove('is-open');
    });
    setBodyLock();
  });

  document.querySelectorAll('[data-hero-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-hero-track]');
    const slides = Array.from(slider.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(slider.querySelectorAll('[data-slider-dot]'));
    const speed = Number(slider.getAttribute('data-autoplay-speed') || 2500);
    if (!track || slides.length === 0) return;

    let current = 0;
    let timer = null;

    const update = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === current;
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        dot.classList.toggle('w-8', isActive);
        dot.classList.toggle('w-2.5', !isActive);
        dot.classList.toggle('bg-white', isActive);
        dot.classList.toggle('bg-white/55', !isActive);
      });
    };

    const start = () => {
      if (slides.length < 2) return;
      stop();
      timer = window.setInterval(() => update(current + 1), speed);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        update(Number(dot.getAttribute('data-index') || 0));
        start();
      });
    });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    update(0);
    start();
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-quantity-action]');
    if (!button) return;
    const wrapper = button.closest('[data-quantity-wrapper]');
    const input = wrapper ? wrapper.querySelector('input[type="number"]') : null;
    if (!input) return;

    const step = Number(input.getAttribute('step') || 1);
    const min = Number(input.getAttribute('min') || 1);
    const action = button.getAttribute('data-quantity-action');
    const current = Number(input.value || min);
    const next = action === 'decrease' ? Math.max(min, current - step) : current + step;
    input.value = String(next);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
});
