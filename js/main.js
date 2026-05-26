const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = new Date().getFullYear();
}

const isHomePage = /(^|\/)(index\.html)?$/.test(window.location.pathname);
const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (isHomePage && canAnimate && "IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(".section-head, .service-card, .package, .stat, .image-panel");

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (isHomePage && canAnimate) {
  const hero = document.querySelector(".hero");
  let ticking = false;

  const updateHeroMotion = () => {
    if (hero) {
      const offset = Math.min(window.scrollY * 0.12, 48);
      hero.style.setProperty("--hero-parallax", `${offset}px`);
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroMotion);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateHeroMotion();
}
