
const letter = `Dear  neha❤️,

Today is not just your birthday,
it is the celebration of the most
beautiful person in my life.

May your smile always shine.
May your dreams always come true.
May happiness always stay with you.

Thank you for every beautiful memory,
every laugh and every special moment.

I wish this birthday brings
love, success and endless joy
into your life.

Happy Birthday My Love ❤️

With Lots of Love,
Sandeep ❤️`;









const typing = document.getElementById("typing");
const cursor = document.getElementById("cursor");
const nextBtn = document.getElementById("nextBtn");

let index = 0;

function writeLetter(){

    if(index < letter.length){

        typing.innerHTML += letter.charAt(index);

        index++;

        setTimeout(writeLetter,45);
    









    }

    else{

        cursor.style.display="none";

        nextBtn.style.display="block";

        nextBtn.animate(

        [

        {
            opacity:0,
            transform:"translateY(30px)"
        },

        {
            opacity:1,
            transform:"translateY(0)"
        }

        ],

        {

        duration:1000,
        fill:"forwards"

        });

    }


}


window.onload = writeLetter;
////

 
/* ======================
      Floating Hearts
====================== */

const emojis=["❤️","💖","💕","💗","💝"];

function createHeart(){

    const heart=document.createElement("span");

    heart.innerHTML=
    emojis[Math.floor(Math.random()*emojis.length)];

    heart.style.position="fixed";

    heart.style.left=Math.random()*100+"vw";

    heart.style.bottom="-30px";

    heart.style.fontSize=(18+Math.random()*18)+"px";

    heart.style.pointerEvents="none";

    heart.style.animation="floatHeart 6s linear forwards";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(createHeart,500);


/* ======================
    Final Button
====================== */

nextBtn.addEventListener("click",()=>{

    window.parent.BirthdayBook.go(6);

});