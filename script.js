"use strict";

/*==================================================
  MITHPOWRITE PORTFOLIO
  SCRIPT V2.0
  PART 1 - CORE ENGINE
==================================================*/

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/*==================================================
  DOM
==================================================*/

const body = document.body;

const loader = $("#loader");

const navbar = $(".navbar");

const menuBtn = $(".menu-btn");

const navLinks = $(".nav-links");

const navItems = $$(".nav-links a");

const backToTop = $("#backToTop");

const progressBar = $(".scroll-progress");

const sections = $$("section[id]");

/*==================================================
  LOADER
==================================================*/

window.addEventListener("load", () => {

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {

        loader.style.display = "none";

    }, 600);

});

/*==================================================
  MOBILE MENU
==================================================*/

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("show");

    });

});

/*==================================================
  SMOOTH SCROLL
==================================================*/

navItems.forEach(link => {

    link.addEventListener("click", e => {

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        const target = $(href);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*==================================================
  ACTIVE NAV
==================================================*/

function updateActiveNav() {

    const scroll = window.scrollY;

    sections.forEach(section => {

        const top = section.offsetTop - 130;

        const height = section.offsetHeight;

        const id = section.id;

        if (scroll >= top && scroll < top + height) {

            navItems.forEach(link => {

                link.classList.toggle(

                    "active",

                    link.getAttribute("href") === "#" + id

                );

            });

        }

    });

}

/*==================================================
  BACK TO TOP
==================================================*/

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==================================================
  NAVBAR + SCROLL ENGINE
==================================================*/

function updateScrollUI() {

    const scroll = window.scrollY;

    if (navbar) {

        navbar.classList.toggle("scrolled", scroll > 60);

    }

    if (backToTop) {

        backToTop.style.display = scroll > 300 ? "flex" : "none";

    }

    if (progressBar) {

        const height =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const progress = (scroll / height) * 100;

        progressBar.style.width = progress + "%";

    }

    updateActiveNav();

}

window.addEventListener(

    "scroll",

    () => requestAnimationFrame(updateScrollUI),

    {

        passive: true

    }

);

/*==================================================
  REVEAL ANIMATION
==================================================*/

const revealElements = $$(
`
.about-card,
.skill-card,
.timeline-item,
.stat-card,
.portfolio-card,
.service-card,
.testimonial-card,
.faq-item,
.contact-card,
.featured-project,
.process-step
`
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach(el => {

    revealObserver.observe(el);

});

/*==================================================
  COUNTERS
==================================================*/

const counters = $$(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            function animate() {

                current += Math.ceil(target / 45);

                if (current > target) current = target;

                counter.textContent = current;

                if (current < target) {

                    requestAnimationFrame(animate);

                }

            }

            animate();

            counterObserver.unobserve(counter);

        });

    },

    {

        threshold: .4

    }

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/*==================================================
  FAQ
==================================================*/

$$(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;

        $$(".faq-item").forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*==================================================
  YEAR
==================================================*/

const year = $("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*==================================================
  PART 1 END
==================================================*/

console.log("MithpoWrite Script V2 - Part 1 Loaded");
/*==================================================
  MITHPOWRITE PORTFOLIO
  SCRIPT V2.0
  PART 2 - PREMIUM EFFECTS
==================================================*/

/*==================================================
  MOUSE GLOW
==================================================*/

const mouseGlow = document.querySelector(".mouse-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

});

function animateGlow(){

if(mouseGlow){

mouseGlow.style.transform=
`translate(${mouseX-150}px,${mouseY-150}px)`;

}

requestAnimationFrame(animateGlow);

}

animateGlow();

/*==================================================
  INTERACTIVE GRID
==================================================*/

document.addEventListener("mousemove",(e)=>{

document.body.style.setProperty("--mx",e.clientX+"px");

document.body.style.setProperty("--my",e.clientY+"px");

});

/*==================================================
  HERO PARALLAX
==================================================*/

const hero=document.querySelector(".hero");

if(hero){

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*18;

const y=(e.clientY/window.innerHeight-.5)*18;

hero.style.backgroundPosition=

`${50+x}% ${50+y}%`;

});

}

/*==================================================
  HERO TYPING
==================================================*/

const typing=document.querySelector(".typing");

if(typing){

const words=[

"Content Writer",

"Researcher",

"LinkedIn Ghostwriter",

"Policy Thinker",

"Freelancer"

];

let word=0;

let char=0;

let deleting=false;

function typingLoop(){

const current=words[word];

typing.textContent=current.substring(0,char);

if(!deleting){

char++;

if(char>current.length){

deleting=true;

setTimeout(typingLoop,1400);

return;

}

}else{

char--;

if(char===0){

deleting=false;

word=(word+1)%words.length;

}

}

setTimeout(

typingLoop,

deleting?45:90

);

}

typingLoop();

}

/*==================================================
  SKILL CARD HOVER
==================================================*/

document.querySelectorAll(".skill-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform=

"translateY(-12px) scale(1.03)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==================================================
  PORTFOLIO 3D TILT
==================================================*/

document.querySelectorAll(".portfolio-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const cx=rect.width/2;

const cy=rect.height/2;

const rx=(cy-y)/18;

const ry=(x-cx)/18;

card.style.transform=

`perspective(1200px)
rotateX(${rx}deg)
rotateY(${ry}deg)
scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1200px) rotateX(0) rotateY(0) scale(1)";

});

});

/*==================================================
  SPOTLIGHT EFFECT
==================================================*/

document.querySelectorAll(

".portfolio-card,.service-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

card.style.setProperty(

"--x",

(e.clientX-rect.left)+"px"

);

card.style.setProperty(

"--y",

(e.clientY-rect.top)+"px"

);

});

});

/*==================================================
  BUTTON RIPPLE
==================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=btn.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

(e.clientX-rect.left-size/2)+"px";

ripple.style.top=

(e.clientY-rect.top-size/2)+"px";

ripple.className="ripple";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*==================================================
  MAGNETIC BUTTONS
==================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=

`translate(${x*.18}px,${y*.18}px)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="";

});

});

/*==================================================
  IMAGE FADE-IN
==================================================*/

document.querySelectorAll("img").forEach(img=>{

img.loading="lazy";

img.addEventListener("load",()=>{

img.classList.add("loaded");

});

});

/*==================================================
  PART 2 END
==================================================*/

console.log("MithpoWrite Script V2 - Part 2 Loaded");
/*==================================================
  MITHPOWRITE PORTFOLIO
  SCRIPT V2.0
  PART 3 - CONTACT + UTILITIES + PERFORMANCE
==================================================*/

/*==================================================
  WEB3FORMS
==================================================*/

const web3Form=document.getElementById("contactForm");

if(web3Form){

web3Form.addEventListener("submit",async(e)=>{

e.preventDefault();

const submitBtn=document.getElementById("submitBtn");

const formMessage=document.getElementById("formMessage");

submitBtn.disabled=true;

submitBtn.textContent="Sending...";

formMessage.textContent="";

try{

const response=await fetch(web3Form.action,{

method:"POST",

body:new FormData(web3Form)

});

const result=await response.json();

if(result.success){

formMessage.textContent="✅ Message sent successfully.";

formMessage.style.color="#22c55e";

web3Form.reset();

}else{

formMessage.textContent="❌ Failed to send message.";

formMessage.style.color="#ef4444";

}

}catch(error){

formMessage.textContent="⚠️ Network error.";

formMessage.style.color="#f59e0b";

}

submitBtn.disabled=false;

submitBtn.textContent="Send Message";

});

}

/*==================================================
  COPY EMAIL
==================================================*/

const copyEmail=document.querySelector(".copy-email");

if(copyEmail){

copyEmail.addEventListener("click",async()=>{

try{

await navigator.clipboard.writeText("pankdhaked@gmail.com");

copyEmail.textContent="Copied ✓";

setTimeout(()=>{

copyEmail.textContent="Copy Email";

},2000);

}catch(e){}

});

}

/*==================================================
  SCROLL DIRECTION
==================================================*/

let lastScroll=0;

window.addEventListener("scroll",()=>{

const current=window.scrollY;

body.classList.toggle(

"scroll-down",

current>lastScroll

);

body.classList.toggle(

"scroll-up",

current<lastScroll

);

lastScroll=current;

},{passive:true});

/*==================================================
  PAGE VISIBILITY
==================================================*/

document.addEventListener(

"visibilitychange",

()=>{

body.classList.toggle(

"page-hidden",

document.hidden

);

}

);

/*==================================================
  ESC CLOSE MENU
==================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

navLinks?.classList.remove("show");

}

});

/*==================================================
  RESIZE OPTIMIZER
==================================================*/

let resizeTimer;

window.addEventListener("resize",()=>{

clearTimeout(resizeTimer);

resizeTimer=setTimeout(()=>{

updateScrollUI();

},150);

});

/*==================================================
  KEYBOARD ACCESSIBILITY
==================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("keyup",(e)=>{

if(e.key==="Enter"){

btn.click();

}

});

});

/*==================================================
  PERFORMANCE FPS
==================================================*/

let lastTime=performance.now();

function animationLoop(now){

const delta=now-lastTime;

lastTime=now;

body.dataset.fps=Math.round(1000/delta);

requestAnimationFrame(animationLoop);

}

requestAnimationFrame(animationLoop);

/*==================================================
  PRELOAD IMAGES
==================================================*/

document.querySelectorAll("img").forEach(img=>{

if(img.dataset.src){

const preload=new Image();

preload.src=img.dataset.src;

}

});

/*==================================================
  DISABLE DRAG
==================================================*/

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});

/*==================================================
  RIGHT CLICK (OPTIONAL)
==================================================*/

// document.addEventListener("contextmenu",e=>e.preventDefault());

/*==================================================
  LOGO CONSOLE
==================================================*/

console.clear();

console.log(

"%cMITHPOWRITE",

"font-size:28px;font-weight:bold;color:#38bdf8;"

);

console.log(

"%cPortfolio Loaded Successfully 🚀",

"font-size:14px;color:#94a3b8;"

);

/*==================================================
  INITIALIZE
==================================================*/

window.addEventListener("load",()=>{

updateScrollUI();

});

/*==================================================
  THE END
==================================================*/

console.log("Script V2 Loaded Successfully");