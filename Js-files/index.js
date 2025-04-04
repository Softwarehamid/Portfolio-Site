const typed = new Typed(".typing", {
    strings: ["", "Web Designer", "Freelancer", "Youtuber"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
  
  const nav = document.querySelector(".nav"),
    navLinks = nav.querySelectorAll("li a"),
    allSections = document.querySelectorAll(".section"),
    navTogglerBtn = document.querySelector(".nav-toggle"),
    aside = document.querySelector(".aside");
  
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
  
      // Remove back-section from all
      allSections.forEach((section) => {
        section.classList.remove("back-section");
      });
  
      // Find and deactivate current section
      const current = document.querySelector(".section.active");
      if (current) {
        current.classList.add("back-section");
        current.classList.remove("active");
      }
  
      // Set new active section
      const targetId = link.getAttribute("href").split("#")[1];
      const targetSection = document.getElementById(targetId);
      targetSection.classList.add("active");
  
      // Update nav link active class
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
  
      // Close nav in mobile view
      if (window.innerWidth <= 1199) {
        toggleAsideMenu();
      }
    });
  });
  
  // Hamburger toggle
  function toggleAsideMenu() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    document.querySelector(".main-content")?.classList.toggle("open");
  }
  
  navTogglerBtn.addEventListener("click", toggleAsideMenu);
  