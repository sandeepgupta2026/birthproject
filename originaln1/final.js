// ==========================================
// CANVAS
// ==========================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

// ==========================================
// ELEMENTS
// ==========================================

const openingSection=document.getElementById("openingSection");
const giftSection=document.getElementById("giftSection");

const stars=document.getElementById("stars");
const shootingStars=document.getElementById("shootingStars");
const clouds=document.getElementById("clouds");

const bgMusic=document.getElementById("bgMusic");

// ==========================================
// CREATE STARS
// ==========================================
//previous start count 50000
const STAR_COUNT=500;

for(let i=0;i<STAR_COUNT;i++){

    const star=document.createElement("span");

    star.className="star";

    const size=Math.random()*3+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*100+"vh";

    star.style.animationDuration=
    (2+Math.random()*4)+"s";

    star.style.animationDelay=
    Math.random()*5+"s";

    stars.appendChild(star);

}

// ==========================================
// SHOOTING STAR
// ==========================================

function createShootingStar(){

    const star=document.createElement("div");

    star.className="shootingStar";

    star.style.left=(window.innerWidth+200)+"px";

    star.style.top=Math.random()*250+"px";

    shootingStars.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2400);

}

setInterval(createShootingStar,2500);

// ==========================================
// CLOUDS
// ==========================================

for(let i=0;i<8;i++){

    const cloud=document.createElement("div");

    cloud.className="cloud";

    cloud.style.top=
    (40+Math.random()*220)+"px";

    cloud.style.animationDuration=
    (35+Math.random()*25)+"s";

    cloud.style.animationDelay=
    (-Math.random()*30)+"s";

    clouds.appendChild(cloud);

}

// ==========================================
// GOLDEN FLOATING LIGHTS
// ==========================================
// previous i<70
for(let i=0;i<70;i++){

    const light=document.createElement("span");

    light.style.position="absolute";

    light.style.width="2px";
    light.style.height="2px";

    light.style.borderRadius="50%";

    light.style.background="gold";

    light.style.boxShadow="0 0 12px gold";

    light.style.left=Math.random()*100+"vw";

    light.style.top=Math.random()*100+"vh";

    light.animate(

    [

        {

            transform:"translateY(0)",

            opacity:.2

        },

        {

            transform:"translateY(-80px)",

            opacity:1

        },

        {

            transform:"translateY(-160px)",

            opacity:.2

        }

    ],

    {

        duration:4000+Math.random()*4000,

        iterations:Infinity

    });

    stars.appendChild(light);

}

// ==========================================
// OPENING
// ==========================================

giftSection.style.display="none";

setTimeout(()=>{

    openingSection.classList.add("fadeOut");

},3500);

setTimeout(()=>{

    openingSection.style.display="none";

    giftSection.style.display="flex";

    giftSection.classList.add("fadeIn");

    bgMusic.volume=0;

    startGiftFall();

},4500);
// ==========================================
// GIFT ANIMATION
// ==========================================

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");

const lid = document.querySelector(".lid");
const magicLight = document.querySelector(".magicLight");

const boom = document.getElementById("boom");

// Button hidden initially

openGift.style.opacity = "0";
openGift.style.pointerEvents = "none";

// Gift starts above screen

gift.style.transform = "translateY(-900px) scale(.2) rotate(720deg)";

// ==========================================
// GIFT FALL
// ==========================================

function startGiftFall(){

    gift.animate([

        {
            transform:"translateY(-900px) scale(.2) rotate(720deg)"
        },

        {
            transform:"translateY(40px) scale(1.05) rotate(20deg)"
        },

        {
            transform:"translateY(-25px)"
        },

        {
            transform:"translateY(10px)"
        },

        {
            transform:"translateY(0)"
        }

    ],{

        duration:2500,
        easing:"ease-out",
        fill:"forwards"

    });

    setTimeout(showButton,2600);

}

// ==========================================
// SHOW BUTTON
// ==========================================

function showButton(){

    openGift.style.pointerEvents="auto";

    openGift.animate([

        {
            opacity:0,
            transform:"translateY(40px)"
        },

        {
            opacity:1,
            transform:"translateY(0)"
        }

    ],{

        duration:800,
        fill:"forwards"

    });

}

// ==========================================
// BUTTON CLICK
// ==========================================

openGift.addEventListener("click",()=>{

    openGift.disabled=true;

    shakeGift();

});

// ==========================================
// SHAKE
// ==========================================

function shakeGift(){

    gift.animate([

        {transform:"translateX(-8px)"},
        {transform:"translateX(8px)"},
        {transform:"translateX(-8px)"},
        {transform:"translateX(8px)"},
        {transform:"translateX(0)"}

    ],{

        duration:120,
        iterations:12

    });

    setTimeout(openGiftBox,1500);

}

// ==========================================
// OPEN GIFT
// ==========================================

function openGiftBox(){

    lid.animate([

        {
            transform:"rotate(0deg)"
        },

        {
            transform:"rotate(-35deg) translateY(-20px)"
        }

    ],{

        duration:800,
        fill:"forwards"

    });

    magicLight.animate([

        {
            opacity:.2,
            transform:"translateX(-50%) scale(.5)"
        },

        {
            opacity:1,
            transform:"translateX(-50%) scale(12)"
        }

    ],{

        duration:1200,
        fill:"forwards"

    });

    boom.currentTime=0;
    boom.play();

    setTimeout(()=>{

        giftSection.style.display="none";

        // Next part me rockets launch honge
        launchRockets();

    },1500);

}


// ==========================================
// ROCKETS + FIREWORKS
// ==========================================

const rocket = document.getElementById("rocket");
const firework = document.getElementById("firework");

const rockets = [];
const particles = [];

// ==========================================
// ROCKET
// ==========================================

class Rocket{

    constructor(x){

        this.x = x;
        this.y = canvas.height + 30;

        this.speed = 8 + Math.random()*3;

        this.target = 100 + Math.random()*200;

        this.color =
        `hsl(${Math.random()*360},100%,60%)`;

        this.dead = false;

    }

    update(){

        this.y -= this.speed;

        if(this.y <= this.target){

            this.dead = true;

            createExplosion(
                this.x,
                this.y,
                this.color
            );

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle = "#fff";

        ctx.arc(
            this.x,
            this.y,
            4,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.beginPath();

        ctx.strokeStyle=this.color;

        ctx.lineWidth=2;

        ctx.moveTo(this.x,this.y+18);

        ctx.lineTo(this.x,this.y+45);

        ctx.stroke();

    }

}

// ==========================================
// PARTICLE
// ==========================================

class Particle{

    constructor(x,y,color){

        this.x=x;
        this.y=y;

        const angle=Math.random()*Math.PI*2;

        const speed=2+Math.random()*6;

        this.vx=Math.cos(angle)*speed;
        this.vy=Math.sin(angle)*speed;

        this.alpha=1;

        this.size=2+Math.random()*3;

        this.color=color;

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        this.vx*=0.98;
        this.vy*=0.98;

        this.vy+=0.04;

        this.alpha-=0.012;

    }

    draw(){

        ctx.globalAlpha=this.alpha;

        ctx.beginPath();

        ctx.fillStyle=this.color;

        ctx.shadowColor=this.color;
        ctx.shadowBlur=25;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.globalAlpha=1;

    }

}

// ==========================================
// EXPLOSION
// ==========================================

function createExplosion(x,y,color){

    //remove
    // firework.currentTime=0;

    // firework.play();

    for(let i=0;i<120;i++){

        particles.push(

            new Particle(
                x,
                y,
                color
            )

        );

    }

}

// ==========================================
// START
// ==========================================

function launchRockets(){

///add
firework.currentTime=0;
firework.play();

    rocket.currentTime=0;

    rocket.play();

    rockets.length=0;

    for(let i=0;i<10;i++){

        rockets.push(

            new Rocket(

                80+i*((canvas.width-160)/9)

            )

        );

    }
    //
    let rocketInterval = setInterval(() => {
    rockets.push(
        new Rocket(
            80 + Math.random() * (canvas.width - 160)
        )
    );
}, 400);


setTimeout(() => {
    clearInterval(rocketInterval);
    //startHeartAnimation();
}, 


35000); // 15 second fireworks



    animateFireworks();

}

// ==========================================
// LOOP
// ==========================================

function animateFireworks(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Rockets

    for(let i=rockets.length-1;i>=0;i--){

        rockets[i].update();

        rockets[i].draw();

        if(rockets[i].dead){

            rockets.splice(i,1);

        }

    }

    // Fireworks

    for(let i=particles.length-1;i>=0;i--){

        particles[i].update();

        particles[i].draw();

        if(particles[i].alpha<=0){

            particles.splice(i,1);

        }

    }

    if(
        rockets.length ||
        particles.length
    ){

        requestAnimationFrame(
            animateFireworks
        );

    }

    else{

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Next Part
        startHeartAnimation();

    }

}

// ==========================================
// HEART ANIMATION
// ==========================================

const heartSection =
document.getElementById("heartSection");

const heartbeat =
document.getElementById("heartbeat");

const heartPoints=[];

for(let t=0;t<=Math.PI*2;t+=0.04){

    const x=
    16*Math.pow(Math.sin(t),3);

    const y=-(

        13*Math.cos(t)

        -5*Math.cos(2*t)

        -2*Math.cos(3*t)

        -Math.cos(4*t)

    );

    heartPoints.push({

        x:x*18,

        y:y*18

    });

}

let progress=0;

// ==========================================
// START
// ==========================================

function startHeartAnimation(){

    heartSection.style.display="flex";

    heartbeat.currentTime=0;

    heartbeat.play();

    progress=0;

    drawHeart();

}

// ==========================================
// DRAW HEART
// ==========================================

function drawHeart(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(

        canvas.width/2,

        canvas.height/2-30

    );

    ctx.beginPath();

    ctx.lineWidth=5;

    ctx.strokeStyle="#ff2d75";

    ctx.shadowColor="#ff2d75";

    ctx.shadowBlur=30;

    ctx.moveTo(

        heartPoints[0].x,

        heartPoints[0].y

    );

    let end=Math.floor(progress);

    for(

        let i=1;

        i<=end && i<heartPoints.length;

        i++

    ){

        ctx.lineTo(

            heartPoints[i].x,

            heartPoints[i].y

        );

    }

    ctx.stroke();

    ctx.restore();

    progress+=1.4;

    if(progress<heartPoints.length){

        requestAnimationFrame(drawHeart);

    }

    else{

        setTimeout(glowHeart,800);

    }

}

// ==========================================
// HEART GLOW
// ==========================================

function glowHeart(){

    let glow=20;

    function pulse(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.save();

        ctx.translate(

            canvas.width/2,

            canvas.height/2-30

        );

        ctx.beginPath();

        ctx.lineWidth=6;

        ctx.strokeStyle="#ff4d94";

        ctx.shadowColor="#ff4d94";

        ctx.shadowBlur=glow;

        ctx.moveTo(

            heartPoints[0].x,

            heartPoints[0].y

        );

        heartPoints.forEach(p=>{

            ctx.lineTo(

                p.x,

                p.y

            );

        });

        ctx.stroke();

        ctx.restore();

        glow+=2;

        if(glow<55){

            requestAnimationFrame(pulse);

        }

        else{

            setTimeout(explodeHeart,600);

        }

    }

    pulse();

}

// ==========================================
// HEART EXPLOSION
// ==========================================

const nameSection =
document.getElementById("nameSection");

const nameCanvas =
document.getElementById("nameCanvas");

const nctx =
nameCanvas.getContext("2d");

nameCanvas.width = innerWidth;
nameCanvas.height = innerHeight;

const nameParticles=[];

class NameParticle{

    constructor(x,y){

        this.x=Math.random()*innerWidth;
        this.y=Math.random()*innerHeight;

        this.tx=x;
        this.ty=y;

        this.size=2;

        this.vx=0;
        this.vy=0;

    }

    update(){

        this.vx+=(this.tx-this.x)*0.02;
        this.vy+=(this.ty-this.y)*0.02;

        this.vx*=0.90;
        this.vy*=0.90;

        this.x+=this.vx;
        this.y+=this.vy;

    }

    draw(){

        nctx.beginPath();

        nctx.fillStyle="#ff4da6";

        nctx.shadowColor="#ff4da6";

        nctx.shadowBlur=12;

        nctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        nctx.fill();

    }

}

// ==========================================
// EXPLODE HEART
// ==========================================

function explodeHeart(){

    heartSection.style.display="none";

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    setTimeout(showParticleName,600);

}

// ==========================================
// CREATE TEXT
// ==========================================

function showParticleName(){

    nameSection.style.display="flex";

    nctx.clearRect(
        0,
        0,
        nameCanvas.width,
        nameCanvas.height
    );

    nctx.fillStyle="#fff";

    nctx.font="bold 150px Poppins";

    nctx.textAlign="center";

    // nctx.fillText(

    //     "PRIYA ❤️",

    //     nameCanvas.width/2,

    //     nameCanvas.height/2

    // );


nctx.font = "bold 90px Poppins"; // Text bada hai isliye font thoda chhota
nctx.textAlign = "center";

// nctx.fillText(
//     "",
//     nameCanvas.width / 2,
//     nameCanvas.height / 2 - 60
// );

nctx.fillText(
    "   HAPPY BIRTHDAY NEHA ❤️",
    nameCanvas.width / 2,
    nameCanvas.height / 2 + 50
);

   nctx.font = "bold 70px Poppins";

// nctx.fillText(
//     "HAPPY BIRTHDAY PRIYA ❤️",
//     nameCanvas.width / 2,
//     nameCanvas.height / 2
// );










    const img=nctx.getImageData(

        0,
        0,
        nameCanvas.width,
        nameCanvas.height

    );

    nameParticles.length=0;

    for(

        let y=0;

        y<img.height;

        y+=5

    ){

        for(

            let x=0;

            x<img.width;

            x+=5

        ){

            const index=
            (y*img.width+x)*4;

            if(img.data[index+3]>150){

                nameParticles.push(

                    new NameParticle(x,y)

                );




//animateName();

// startPLetterRain();

 //startPRain();







            }

        }

    }

    nctx.clearRect(
        0,
        0,
        nameCanvas.width,
        nameCanvas.height
    );

    animateName();

}

// ==========================================
// LOOP
// ==========================================

function animateName(){

    nctx.clearRect(
        0,
        0,
        nameCanvas.width,
        nameCanvas.height
    );

    nameParticles.forEach(p=>{

        p.update();

        p.draw();

    });

    requestAnimationFrame(
        animateName
    );


    ////
    let photoShown = false;

function animateName(){

    nctx.clearRect(
        0,
        0,
        nameCanvas.width,
        nameCanvas.height
    );

    nameParticles.forEach(p=>{

        p.update();
        p.draw();

    });

    if(!photoShown){

        photoShown = true;

        setTimeout(showNamePhoto,2000);

    }

    requestAnimationFrame(animateName);

}
//////


//////
function showNamePhoto(){

    const box =
    document.getElementById("namePhotoBox");

    box.animate([

        {
            opacity:0,
            transform:"translateY(40px) scale(.8)"
        },

        {
            opacity:1,
            transform:"translateY(0) scale(1)"
        }

    ],{

        duration:1200,
        fill:"forwards",
        easing:"ease-out"

    });

}
/////

}







 function startPRain(){}

    setInterval(()=>{

        const p=document.createElement("div");
    
        p.innerText="n";

        p.style.position="fixed";
        p.style.left=Math.random()*100+"vw";
        p.style.top="-50px";

        //p.style.fontSize=(18+Math.random()*20)+"px";
        p.style.fontWeight="bold";
        p.style.color="#ff4da6";

        p.style.pointerEvents="none";
        p.style.userSelect="none";
        p.style.zIndex="9999";

        
        nameSection.appendChild(p);

        p.animate([
            {
                transform:"translateY(0)",
                opacity:1
            },
            {
                transform:"translateY(110vh)",
                opacity:1
            }
        ],{
            duration:2000+Math.random()*1500,
            easing:"linear"
        });

        setTimeout(()=>p.remove(),3500);

    },40);   // 30ms = heavy rain















