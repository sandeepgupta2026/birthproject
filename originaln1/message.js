// ===============================
// Continue Button
// ===============================

document.getElementById("nextBtn").addEventListener("click", () => {
    window.parent.BirthdayBook.go(3);
});


// ===============================
// Floating Hearts
// ===============================

const heartContainer = document.querySelector(".hearts");

const heartEmoji = [
    "❤️","💖","💕","💗","💝","💞","✨"
];

function createHeart(){

    const heart = document.createElement("span");

    heart.innerHTML =
        heartEmoji[Math.floor(Math.random()*heartEmoji.length)];

    heart.style.position="fixed";

    heart.style.left=Math.random()*100+"vw";

    heart.style.bottom="-50px";

    heart.style.fontSize=(20+Math.random()*25)+"px";

    heart.style.animation=`heartFloat ${5+Math.random()*4}s linear forwards`;

    heartContainer.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,250);


// ===============================
// Cards Animation
// ===============================

const cards=document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.animate([

        {
            opacity:0,
            transform:"translateY(80px) scale(.7)"
        },

        {
            opacity:1,
            transform:getComputedStyle(card).transform
        }

    ],{

        duration:900,

        delay:index*250,

        fill:"forwards"

    });

});


// ===============================
// Button Pulse
// ===============================

const btn=document.getElementById("nextBtn");

setInterval(()=>{

    btn.animate([

        {transform:"scale(1)"},

        {transform:"scale(1.08)"},

        {transform:"scale(1)"}

    ],{

        duration:800

    });

},2500);


// ===============================
// Random Card Rotation
// ===============================

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition=".4s";

        card.style.zIndex="100";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.zIndex="1";

    });

});


// ===============================
// Page Fade
// ===============================

document.body.animate(

[
    {
        opacity:0
    },
    {
        opacity:1
    }
],

{
    duration:1200,
    fill:"forwards"
}

);