// Typing animation
const typed = new Typed(".typing", {
  strings: ["", "Web Designer", "Freelancer", "Youtuber"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

// Element references
const nav = document.querySelector(".nav"),
  navLinks = nav.querySelectorAll("li a"),
  allSections = document.querySelectorAll(".section"),
  navTogglerBtn = document.querySelector(".nav-toggle"),
  aside = document.querySelector(".aside"),
  mainContent = document.querySelector(".main-content"),
  hireMeBtn = document.querySelector(".hire-me");

// Toggle aside menu (mobile)
function toggleAsideMenu() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  mainContent?.classList.toggle("open");

  // Disable scroll when menu is open
  if (window.innerWidth <= 1199) {
    document.body.style.overflow = aside.classList.contains("open")
      ? "hidden"
      : "";
  }
}

// Set active section
function activateSection(targetId) {
  allSections.forEach((section) => {
    section.classList.remove("back-section", "active");
  });

  const current = document.querySelector(".section.active");
  if (current) {
    current.classList.add("back-section");
  }

  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  navLinks.forEach((link) => link.classList.remove("active"));
  const matchingLink = document.querySelector(`.nav li a[href="#${targetId}"]`);
  if (matchingLink) {
    matchingLink.classList.add("active");
  }

  if (window.innerWidth <= 1199 && aside.classList.contains("open")) {
    toggleAsideMenu();
  }
}

// Nav link clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").split("#")[1];
    activateSection(targetId);
  });
});

// Hamburger toggle
navTogglerBtn.addEventListener("click", toggleAsideMenu);

// Hire Me button
hireMeBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  activateSection("contact");
});

// Close nav when clicking outside
document.addEventListener("click", (e) => {
  const isClickInside =
    aside.contains(e.target) || navTogglerBtn.contains(e.target);
  if (!isClickInside && aside.classList.contains("open")) {
    toggleAsideMenu();
  }
});

// 🔥 Always-active scroll-to-close nav
window.addEventListener(
  "scroll",
  () => {
    if (window.innerWidth <= 1199 && aside.classList.contains("open")) {
      toggleAsideMenu();
    }
  },
  true
); // use capture to detect scroll in nested elements

function fakeDownloadCV() {
  alert("This is a demo. CV download will be available soon!");
}
