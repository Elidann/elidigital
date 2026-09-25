/* ── Hamburger toggle ── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.toggle("hidden");
  hamburger.classList.toggle("ham-open", !isHidden);
});

function closeMobile() {
  mobileMenu.classList.add("hidden");
  hamburger.classList.remove("ham-open");
}

/* ── Projects carousel ── */
const projectsTrack = document.getElementById("projectsTrack");
const projectsPrev = document.getElementById("projectsPrev");
const projectsNext = document.getElementById("projectsNext");

function scrollProjects(direction) {
  const card = projectsTrack.querySelector(".project-card");
  if (!card) return;
  const gap = parseFloat(getComputedStyle(projectsTrack).columnGap) || 0;
  projectsTrack.scrollBy({
    left: (card.offsetWidth + gap) * direction,
    behavior: "smooth",
  });
}

projectsPrev.addEventListener("click", () => scrollProjects(-1));
projectsNext.addEventListener("click", () => scrollProjects(1));

/* ── Per-project screenshot galleries: tap the picture or use the arrows ── */
document.querySelectorAll(".project-gallery").forEach((gallery) => {
  const images = gallery.querySelectorAll(".gallery-img");
  const dots = gallery.querySelectorAll(".gallery-dot");
  const caption = gallery.querySelector(".gallery-caption");
  const prevBtn = gallery.querySelector(".gallery-prev");
  const nextBtn = gallery.querySelector(".gallery-next");
  let index = 0;

  function show(next) {
    index = (next + images.length) % images.length;
    images.forEach((img, n) => img.classList.toggle("opacity-0", n !== index));
    dots.forEach((dot, n) => {
      dot.classList.toggle("bg-white", n === index);
      dot.classList.toggle("bg-white/40", n !== index);
    });
    if (caption) caption.textContent = images[index].dataset.caption || "";
  }

  show(0);

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(index - 1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(index + 1);
  });
  gallery.addEventListener("click", () => show(index + 1));
});

/* ── Skills flip cards: tap-to-flip (devices without real :hover use this; desktop still gets hover from the CSS) ── */
document.querySelectorAll(".flip-trigger").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
