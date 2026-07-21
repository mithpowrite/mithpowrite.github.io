window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity = "0";

loader.style.pointerEvents = "none";

setTimeout(() => {

loader.style.display = "none";

},600);

}

});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(backToTop){

if(window.scrollY>300){

backToTop.style.display="flex";

}else{

backToTop.style.display="none";

}

}

});

if(backToTop){

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

const menuBtn=document.querySelector(".menu-btn");

const navLinks=document.querySelector(".nav-links");

if(menuBtn && navLinks){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("show");

});

}

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(navbar){

if(window.scrollY>80){

navbar.style.background="rgba(8,17,31,.95)";

navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

}else{

navbar.style.background="rgba(8,17,31,.75)";

navbar.style.boxShadow="none";

}

}

});
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function activeNav() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navItems.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", activeNav);

const revealElements = document.querySelectorAll(
    ".about-card,.skill-card,.timeline-item,.stat-card,.portfolio-card,.service-card,.testimonial-card,.faq-item,.contact-card,.featured-project,.process-step"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((el) => revealObserver.observe(el));

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("show");
        }
    });
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.getAttribute("data-target"));
            const speed = 40;

            let count = 0;

            const updateCounter = () => {
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    count += increment;

                    if (count > target) {
                        count = target;
                    }

                    counter.textContent = count;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        });
    },
    {
        threshold: 0.5,
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
        question.addEventListener("click", () => {
            faqItems.forEach((faq) => {
                if (faq !== item) {
                    faq.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = this.querySelectorAll("input, textarea");
        let valid = true;

        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                valid = false;
            } else {
                input.classList.remove("error");
            }
        });

        if (valid) {
            const submitBtn = this.querySelector("button");

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            setTimeout(() => {
                alert("Message sent successfully!");

                this.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send Message";
                }
            }, 1200);
        }
    });
}

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

const portfolioCards = document.querySelectorAll(".portfolio-card");

portfolioCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });
});
const hero = document.querySelector(".hero");

if (hero) {
    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
}

const typingElement = document.querySelector(".typing");

if (typingElement) {
    const words = [
        "Content Writer",
        "Researcher",
        "Storyteller",
        "Creative Thinker",
        "Freelancer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex++);
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = deleting ? 60 : 120;

        if (!deleting && charIndex > currentWord.length) {
            deleting = true;
            speed = 1500;
        }

        if (deleting && charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    document.querySelectorAll(".parallax").forEach((element) => {
        element.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
});

document.querySelectorAll(".portfolio-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transition = "0.35s";
    });
});

console.log("Portfolio Loaded Successfully");
/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 40){

nav.classList.add("scrolled");

}else{

nav.classList.remove("scrolled");

}

});
/*==================================
      SCROLL PROGRESS BAR
===================================*/

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll",()=>{

const scrollTop =
document.documentElement.scrollTop;

const scrollHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const progress =
(scrollTop/scrollHeight)*100;

progressBar.style.width =
progress + "%";

});
/*==================================
      MOUSE GLOW
===================================*/

const glow=document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});
/*==================================
      3D CARD EFFECT
===================================*/

document.querySelectorAll(".portfolio-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const centerX=rect.width/2;

const centerY=rect.height/2;

const rotateY=(x-centerX)/18;

const rotateX=(centerY-y)/18;

card.style.transform=
`rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=
"rotateX(0) rotateY(0) scale(1)";

});

});
/*==================================
      SPOTLIGHT EFFECT
===================================*/

document.querySelectorAll(".portfolio-card,.service-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

card.style.setProperty("--x",(e.clientX-rect.left)+"px");

card.style.setProperty("--y",(e.clientY-rect.top)+"px");

});

});
/*==================================
      INTERACTIVE GRID
===================================*/

document.addEventListener("mousemove",(e)=>{

document.body.style.setProperty("--mx",e.clientX+"px");

document.body.style.setProperty("--my",e.clientY+"px");

});