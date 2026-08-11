const photos = [
    "../n.i/neha17.jpeg",
    "../n.i/neha30.jpeg",
    "../n.i/neha5.jpeg",
    "../n.i/neha15.jpeg",
    "../n.i/neha2.jpeg"
];

const titles = [
    "Beautiful Smile ❤️",
    "Sweet Memories 💖",
    "My Favourite Person 🥰",
    "Forever Together 💕",
    "Happy Birthday 🎂"
];

const messages = [

`Every smile of yours
makes my day brighter.

Happy Birthday ❤️`,

`Life becomes beautiful
whenever you smile.

Stay happy forever 💖`,

`Every moment with you
is a beautiful memory.

Keep smiling 😊`,

`Thank you for being
such a wonderful person.

You are special ❤️`,

`May all your dreams
come true.

Happy Birthday 🎉`

];

let index = 0;

const photo = document.getElementById("photo");
const title = document.getElementById("title");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
// etra for error 
// First image load
photo.src = photos[index];
title.textContent = titles[index];
message.textContent = messages[index];
////

nextBtn.addEventListener("click", () => {

    // Rotate + Fade Out
    photo.style.transition = "0.6s";
    photo.style.opacity = "0";
    photo.style.transform = "rotate(20deg) scale(.8)";

    title.style.opacity = "0";
    message.style.opacity = "0";

    setTimeout(() => {

        index++;

        if(index >= photos.length){

            window.parent.BirthdayBook.go(5);
            return;

        }

        photo.src = photos[index];

        title.innerHTML = titles[index];
        message.innerHTML = messages[index];

        // Next Image Entry
        photo.style.transform = "rotate(-20deg) scale(.8)";

        setTimeout(()=>{

            photo.style.opacity="1";
            photo.style.transform="rotate(0deg) scale(1)";

            title.style.opacity="1";
            message.style.opacity="1";

        },100);

    },600);

});


// =======================
// Floating Hearts
// =======================

setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.bottom="-20px";

heart.style.fontSize=(20+Math.random()*20)+"px";

heart.style.pointerEvents="none";

heart.style.animation="heart 6s linear forwards";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},500);