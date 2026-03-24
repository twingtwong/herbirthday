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

function createGallery(){
  gallery.innerHTML="";

  const images = [
    {src: "img1.jpeg"},
    {src: "img2.jpeg"},
    {src: "img3.jpeg"},
    {src: "img4.jpeg"},
    {src: "img5.jpeg", final: true}
  ];

  images.forEach((item, i) => {

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.src;

    card.appendChild(img);

    // final card
    if(item.final){
      const label = document.createElement("div");
      label.className = "finalLabel";
      label.innerText = "Tap Me 💌";
      card.appendChild(label);

      card.onclick = () => expandCard();
    }

    gallery.appendChild(card);

    // animation
    setTimeout(() => {

      const startX = (Math.random() - 0.5) * 600;
      const startY = (Math.random() - 0.5) * 600;

      // start position
      card.style.transform =
        `translate(${startX}px, ${startY}px) scale(0.5) rotate(${Math.random()*360}deg)`;

      requestAnimationFrame(() => {

        const rot = (Math.random() - 0.5) * 6;

        card.style.opacity = "1";
        card.style.transform =
          `translate(0, 0) scale(1) rotate(${rot}deg)`;

      });

    }, i * 2300);

  }); // 👈 THIS WAS MISSING

}

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

I love youuuu so so so so so so so so muchhhhhhhhh ❤️

and these lines below are pretty much my feelings....

हो, मार्या-मार्या फिरे, देख हाल तू बिचारे का
तेरे बिना जीणा भी के जीणा बंजारे का?
खोया रहूं याद तेरी कर के नादानियां
बटुए में रखूं तेरी सांभ के निशानियां
तेरे बिना काल होरया, ठीक कोन्या हाल मेरा
हाथ जोड़ूं राम, देदे सांसों ते रिहाई मन्ने
गीतां में गाई, कदे छाती के लगाई मन्ने
जित भी गया रे, तेरी याद खड़ी पाई मन्ने
सांभ-सांभ राखी बहुत, छाती के लगाई मन्ने
जित भी गया रे, तेरी याद खड़ी पाई मन्ने`;


  const el=document.getElementById("finalMessage");
  let i=0;

  function type(){
  if(i < msg.length){

    const char = msg[i];
    el.innerText += char;
    i++;

    // 👇 detect Hindi (Unicode range)
    const isHindi = /[\u0900-\u097F]/.test(char);

    const delay = isHindi ? 100 : 40; // 👈 adjust here

    setTimeout(type, delay);
  }
}
  type();
}

});

