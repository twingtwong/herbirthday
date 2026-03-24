document.addEventListener("DOMContentLoaded", () => {

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");

const textContainer = document.getElementById("birthdayText");
const gallery = document.getElementById("gallery");

nextBtn.style.display = "none";

/* BG FLOAT */
let bgInterval;
function startFloatingBG() {
  const container = document.getElementById("bgFloating");
  bgInterval = setInterval(() => {
    const el = document.createElement("div");
    el.className = "floating";
    el.innerText = Math.random() > 0.5 ? "❤️" : "🎂";
    el.style.left = Math.random()*100 + "vw";
    el.style.animationDuration = (Math.random()*3+4)+"s";
    container.appendChild(el);
    setTimeout(()=>el.remove(),5000);
  },300);
}
function stopFloatingBG(){
  clearInterval(bgInterval);
  document.getElementById("bgFloating").innerHTML="";
}
startFloatingBG();

/* SCREEN 1 → 2 */
startBtn.onclick = () => {
  const music = document.getElementById("bgMusic");
  music.currentTime = 5;

  // 👇 play music safely
  music.play().catch(() => {});
  stopFloatingBG();
  screen1.classList.add("tunnel");
  setTimeout(()=>{
    screen1.classList.remove("active","tunnel");
    screen2.classList.add("active");
    animateText();
  },700);
};

/* TEXT */
function animateText() {
  const text = "HAPPY  BIRTHDAY TO MY PASANDEEDA AURAT! ❤️";
  textContainer.innerHTML = "";

  let delay = 0;

  text.split("").forEach(letter => {

    if (letter === " ") {
      const space = document.createElement("span");
      space.innerHTML = "&nbsp;&nbsp;";
      textContainer.appendChild(space);
      return;
    }

    const span = document.createElement("span");
    span.innerText = letter;

    span.style.display = "inline-block";
    span.style.color = "#fff";

    // 🔥 START HIDDEN
    span.style.opacity = "0";

    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 150;

    span.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;

    textContainer.appendChild(span);

    // 👇 IMPORTANT: small delay before animating
    setTimeout(() => {
      span.style.transition = "all 0.5s ease-out";
      span.style.opacity = "1";
      span.style.transform = "translate(0, 0) scale(1)";
    }, delay + 50); // 👈 slight offset fixes instant visibility

    delay += 200;
  });

  // show button after animation
  setTimeout(() => {
    startConfetti();
    nextBtn.style.display = "block";
nextBtn.style.opacity = "0";

setTimeout(() => {
  nextBtn.style.transition = "opacity 0.6s ease";
  nextBtn.style.opacity = "1";
}, 50);
  }, delay + 300);
}

/* CONFETTI */
let running=false;
function startConfetti(){
  const c = document.getElementById("confettiCanvas");
  const ctx = c.getContext("2d");

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  c.style.opacity = "0";
  c.style.transition = "opacity 0.8s ease";

  requestAnimationFrame(() => {
    c.style.opacity = "1"; // 👈 smooth fade-in
  });

  running = true;

  let pieces = Array.from({length: 60}, () => ({
    x: Math.random()*c.width,
    y: Math.random()*c.height,
    s: Math.random()*3+1
  }));

  function update(){
    if(!running) return;
    ctx.clearRect(0,0,c.width,c.height);

    pieces.forEach(p=>{
      p.y += p.s;
      if(p.y > c.height) p.y = 0;

      ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
      ctx.fillRect(p.x,p.y,2,2);
    });

    requestAnimationFrame(update);
  }

  update();
}
function stopConfetti(){running=false;}

/* SCREEN 2 → 3 */
nextBtn.onclick=()=>{
  stopConfetti();
  screen2.classList.add("tunnel");
  setTimeout(()=>{
    screen2.classList.remove("active","tunnel");
    screen3.classList.add("active");
    createGallery();
  },700);
};

/* BACK */
backBtn.onclick=()=>{
  screen3.classList.add("tunnel");
  setTimeout(()=>{
    screen3.classList.remove("active","tunnel");
    screen2.classList.add("active");
  },700);
};

/* 3D GALLERY TOUCH */
let autoRotate = true;
let velocity = 0;
let lastTouchX = 0;
let lastMoveTime = 0;
let resumeTimeout;
let rotation=0;
let cards=[];
let touchStartX=0;

function createGallery(){
  gallery.innerHTML="";
  cards=[];
  const images = [
  {src: "img1.jpeg"},
  {src: "img2.jpeg"},
  {src: "img3.jpeg"},
  {src: "img4.jpeg"},
  {src: "img5.jpeg", final: true} // 👈 ONLY THIS opens ending
];

  
  images.forEach((item,i)=>{
    let c=document.createElement("div");
    c.className="card";

    c.innerHTML = `<img src="${item.src}">`;

    // 👇 add label for final card
    if(item.final){
      const label = document.createElement("div");
      label.innerText = "Tap Me 💌";
      label.style.position = "absolute";
      label.style.bottom = "5px";
      label.style.width = "100%";
      label.style.textAlign = "center";
      label.style.fontSize = "14px";
      c.appendChild(label);
    }

    gallery.appendChild(c);
    cards.push(c);

    c.onclick = () => {
      if(item.final){
        expandCard(); // go to final
      }
    };
  });

  animateGallery();
}

function animateGallery(){

  if(autoRotate){
    rotation += 0.1; // slow smooth rotation
  }

  cards.forEach((c,i)=>{
    let angle = (i/cards.length)*360 + rotation;
    c.style.transform = `rotateY(${angle}deg) translateZ(220px)`;
  });

  requestAnimationFrame(animateGallery);
}

window.addEventListener("touchstart", e => {
  autoRotate = false;

  lastTouchX = e.touches[0].clientX;
  lastMoveTime = Date.now();

  clearTimeout(resumeTimeout);
});

window.addEventListener("touchmove", e => {
  const currentX = e.touches[0].clientX;
  const now = Date.now();

  const dx = currentX - lastTouchX;
  const dt = now - lastMoveTime;

  rotation += dx * 0.3;

  // 👇 calculate velocity (for inertia)
  velocity = dx / dt;

  lastTouchX = currentX;
  lastMoveTime = now;
});
window.addEventListener("touchend", () => {

  function applyInertia() {
    velocity *= 0.95;

    if (Math.abs(velocity) > 0.01) {
      rotation += velocity * 20;
      requestAnimationFrame(applyInertia);
    } else {
      autoRotate = true; // 👈 resumes immediately after slowing
    }
  }

  applyInertia();

});

/* FINAL */
function expandCard(){
  screen3.classList.add("tunnel");
  setTimeout(()=>{
    screen3.classList.remove("active","tunnel");
    screen4.classList.add("active");
    showFinalMessage();
  },700);
}

function showFinalMessage(){
  const msg=`Hey Baby, ITS YOUR BIRTHDAYYYY ❤️

Happy Birthday :)

Aao tumhe tumhari qualities ginvau

You are Smartyyyy
Your fashion sense is top notch (i am jealous)
You are sweet (yum yum)
You are cute (self explanatory)
You are hot (😳)
All in all, you are a beauty with brains.
It's your day baby, enjoyyyyyyyyyyyyyyyyy HURRAHHHHHHHHHHHHHHHHHH AHHHHH!!!!!!!

I love youuuu so so so so so so muchhhhhhhhh ❤️`;

  const el=document.getElementById("finalMessage");
  let i=0;

  function type(){
    if(i<msg.length){
      el.innerText+=msg[i++];
      setTimeout(type,40);
    }
  }
  type();
}

});
