// Initialize Typed.js
const typed = new Typed(".typing", {
    strings: ["","Web Designer", "Freelancer", "Youtuber"], // Add the strings you want to display
    typeSpeed: 100, // Typing speed in milliseconds
    backSpeed: 60, // Backspacing speed in milliseconds
    loop: true // Loop the animation
    
});


// Aside
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        for (let j = 0; j < totalNavList; j++) {
            if(navList[j].querySelector("a").classList.contains("active")){
                allSection[j].classList.add("back-section");
            };
            navList[j].querySelector("a").classList.remove("active");
        }
        a.classList.add("active");
        showSection(a);
    });
    
}

function showSection(element) {
    const target = element.getAttribute("href").split("#")[1];
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    document.querySelector("#" + target).classList.add("active");
}

const navTogglerBtn = document.querySelector(".nav-toggle"),
    aside = document.querySelector(".aside");
    navTogglerBtn.addEventListener("click", () => 
    {
        asideSectionTogglerBtn();
    });
    function asideSectionTogglerBtn() {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    
        // This line is the missing link
        document.querySelector(".main-content").classList.toggle("open");
    }
    


    function asideSectionTogglerBtn() {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("hide"); // Use display: none in CSS
    }
    
