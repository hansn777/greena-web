// Simple nav active state and smooth scroll placeholders
(function () {
  const nav = document.querySelector(".nhn-nav");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nhn-nav-item");
    if (!btn) return;

    nav
      .querySelectorAll(".nhn-nav-item")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });

  // Basic reveal on scroll for cards/tiles
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = "1";
          en.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".nhn-card, .nhn-tile, .nhn-news-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
      io.observe(el);
    });

  // Hero carousel
  const slides = Array.from(document.querySelectorAll(".nhn-hero-slide"));
  const idxCurrent = document.querySelector(".nhn-hero-idx.current");
  const idxTotal = document.querySelector(".nhn-hero-idx.total");
  const prevBtn = document.querySelector(".nhn-hero-arrows .prev");
  const nextBtn = document.querySelector(".nhn-hero-arrows .next");
  let current = 0;
  const durationMs = 5000;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function setSlide(i) {
    slides.forEach((s, si) => s.classList.toggle("active", si === i));
    const nextIdx = (i + 1) % slides.length;
    if (idxCurrent) idxCurrent.textContent = pad2(i + 1);
    if (idxTotal) idxTotal.textContent = pad2(nextIdx + 1);
    current = i;
    // restart progress bar (foreground fill)
    const fill = document.querySelector(".nhn-hero-progress-fill");
    if (fill) {
      fill.style.setProperty("--slide-duration", durationMs / 1000 + "s");
      fill.classList.remove("animating");
      void fill.offsetWidth; // reflow to restart animation
      fill.classList.add("animating");
    }
  }

  if (prevBtn)
    prevBtn.addEventListener("click", () =>
      setSlide((current - 1 + slides.length) % slides.length)
    );
  if (nextBtn)
    nextBtn.addEventListener("click", () =>
      setSlide((current + 1) % slides.length)
    );

  // Auto-rotate with reduced-motion respect
  const autoTimer = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = (current + 1) % slides.length;
    setSlide(next);
  };
  setInterval(autoTimer, durationMs);

  // Initialize
  setSlide(0);
})();
