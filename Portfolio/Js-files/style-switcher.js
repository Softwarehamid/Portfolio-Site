/*Toggle style switcher */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");  
const styleSwitcher = document.querySelector(".style-switcher");
styleSwitcherToggle.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcherToggle.querySelector("i").classList.remove("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.add("fa-xmark");
    } else {
        styleSwitcherToggle.querySelector("i").classList.add("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.remove("fa-xmark");
    }
});

/* Theme colors */
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}
/* Light and dark mode */   
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    // Toggle the sun and moon icons
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");

    // Toggle the dark mode class on the body
    document.body.classList.toggle("dark");

    // Store the current icon in local storage
    const icon = dayNight.querySelector("i").classList.contains("fa-sun") ? "fa-sun" : "fa-moon";
    localStorage.setItem("theme-icon", icon);
});

/* Theme color from local storage */
const currentTheme = localStorage.getItem("theme-color");
const currentIcon = localStorage.getItem("theme-icon");
if (currentTheme) {
    setActiveStyle(currentTheme);
}
if (currentIcon) {
    if (currentIcon === "fa-sun") {
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
        document.body.classList.remove("dark");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
        dayNight.querySelector("i").classList.remove("fa-sun");
        document.body.classList.add("dark");
    }
}
/* Store theme color and icon in local storage */
function storeTheme(color) {
    localStorage.setItem("theme-color", color);
}
function storeIcon(icon) {
    localStorage.setItem("theme-icon", icon);
}
/* Store theme color and icon in local storage when changed */
alternateStyles.forEach((style) => {
    style.addEventListener("click", () => {
        let color = style.getAttribute("title");
        setActiveStyle(color);
        storeTheme(color);
    });
});
// Close style switcher on scroll
window.addEventListener("scroll", () => {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
        styleSwitcherToggle.querySelector("i").classList.add("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.remove("fa-xmark");
    }
});

// Close style switcher on click outside
document.addEventListener("click", (e) => {
    if (!styleSwitcher.contains(e.target) && !styleSwitcherToggle.contains(e.target)) {
        styleSwitcher.classList.remove("open");
        styleSwitcherToggle.querySelector("i").classList.add("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.remove("fa-xmark");
    }
});

// Close style switcher on resize
window.addEventListener("resize", () => {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
        styleSwitcherToggle.querySelector("i").classList.add("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.remove("fa-xmark");
    }
});

// Close style switcher on ESC key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
        styleSwitcherToggle.querySelector("i").classList.add("fa-cog");
        styleSwitcherToggle.querySelector("i").classList.remove("fa-xmark");
    }
});

