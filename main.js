function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  tl.seekToStart = () => {
    tl.seek(0);
  };
  return tl;
}
const elem = gsap.utils.toArray(".ticker__tape");
let logo = gsap.utils.toArray(".company-logo .track");
let btn = gsap.utils.toArray(".button .btn-track");
let btn2 = gsap.utils.toArray(".btn .btn-track-1");
let btn3 = gsap.utils.toArray('.btn-2 .btn-track-2');
let blurBtn = gsap.utils.toArray('.blur-btn span a');
let itemBox = gsap.utils.toArray('.tile-content, .tile-track' );
let itemBox2 = gsap.utils.toArray('.tile-content2, .tile-track2' );
let itemBox3 = gsap.utils.toArray('.tile-content3, .tile-track3' );
let itemBox4 = gsap.utils.toArray('.tile-content4, .tile-track4' );
let itemBox5 = gsap.utils.toArray('.tile-content5, .tile-track5' );

const loop = horizontalLoop(elem, { pause: true, repeat: -1, speed:0.8 });
const loopLogo = horizontalLoop(logo, { pause: true, repeat: -1, speed: 0.8});
let btnLoop = horizontalLoop(".button .btn-track", { pause:true, repeat:-1, speed:1.2});
let btnLoop2 = horizontalLoop(".btn .btn-track-1",{pause:true , repeat:-1, speed:1});
let btnLoop3 = horizontalLoop(".btn-2 .btn-track-2",{pause:true , repeat:-1, speed:1.2});
let blurBtnLoop = horizontalLoop(".blur-btn span a",{pause:true , repeat:-1, speed:1.2});
let itemBoxLoop = horizontalLoop(".tile-content",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop2 = horizontalLoop(".tile-track",{pause:true , repeat:-1, speed:2});
let itemBoxLoop3 = horizontalLoop(".tile-content2",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop4 = horizontalLoop(".tile-track2",{pause:true , repeat:-1, speed:2});
let itemBoxLoop5 = horizontalLoop(".tile-content3",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop6 = horizontalLoop(".tile-track3",{pause:true , repeat:-1, speed:2});
let itemBoxLoop7 = horizontalLoop(".tile-content4",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop8 = horizontalLoop(".tile-track4",{pause:true , repeat:-1, speed:2});
let itemBoxLoop9 = horizontalLoop(".tile-content5",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop10 = horizontalLoop(".tile-track5",{pause:true , repeat:-1, speed:2});
let itemBoxLoop11 = horizontalLoop(".tile-content6",{pause:true , repeat:-1, speed:1.5});
let itemBoxLoop12 = horizontalLoop(".tile-track6",{pause:true , repeat:-1, speed:2});

btnLoop.pause()
btnLoop2.pause()
btnLoop3.pause()
itemBoxLoop.pause()
itemBoxLoop2.pause()
itemBoxLoop3.pause()
itemBoxLoop4.pause()
itemBoxLoop5.pause()
itemBoxLoop6.pause()
itemBoxLoop7.pause()
itemBoxLoop8.pause()
itemBoxLoop9.pause()
itemBoxLoop10.pause()
itemBoxLoop11.pause()
itemBoxLoop12.pause()
blurBtnLoop.pause()

// btn 1
let btnEle = document.querySelector('.button, .pieces-btn') 
btnEle.addEventListener('mouseover',function(){
  btnLoop.play()
});
btnEle.addEventListener('mouseout', function(){
  btnLoop.pause()
  btnLoop.seekToStart()
});
// btn2
let btnEle2 = document.querySelector('.btn') 
btnEle2.addEventListener('mouseover',function(){
  btnLoop2.play()
});
btnEle2.addEventListener('mouseout', function(){
  btnLoop2.pause()
  btnLoop2.seekToStart()
});
// btn3
let btnEle3 = document.querySelector('.btn-2') 
btnEle3.addEventListener('mouseover',function(){
  btnLoop3.play()
});
btnEle3.addEventListener('mouseout', function(){
  btnLoop3.pause()
  btnLoop3.seekToStart()
});
// blur btn
let blurbtn = document.querySelector('.blur-btn ') 
blurbtn.addEventListener('mouseover',function(){
  blurBtnLoop.play()
});
blurbtn.addEventListener('mouseout', function(){
  blurBtnLoop.pause()
  blurBtnLoop.seekToStart()
});
// ITEM BOX
let itembox = document.querySelector('.item-box1') 
itembox.addEventListener('mouseover',function(){
  itemBoxLoop.play()
  itemBoxLoop2.play()
});
itembox.addEventListener('mouseout', function(){
  itemBoxLoop.pause()
  itemBoxLoop.seekToStart()
  itemBoxLoop2.pause()
  itemBoxLoop2.seekToStart()
});
// ITEM BOX 2
let itembox2 = document.querySelector('.item-box2') 
itembox2.addEventListener('mouseover',function(){
  itemBoxLoop3.play()
  itemBoxLoop4.play()
});
itembox2.addEventListener('mouseout', function(){
  itemBoxLoop3.pause()
  itemBoxLoop4.pause()
  itemBoxLoop3.seekToStart()
  itemBoxLoop4.seekToStart()
});
// ITEM BOX 3
let itembox3 = document.querySelector('.item-box3') 
itembox3.addEventListener('mouseover',function(){
  itemBoxLoop5.play()
  itemBoxLoop6.play()
});
itembox3.addEventListener('mouseout', function(){
  itemBoxLoop5.pause()
  itemBoxLoop6.pause()
  itemBoxLoop5.seekToStart()
  itemBoxLoop6.seekToStart()
});
// ITEM BOX 4
let itembox4 = document.querySelector('.item-box4') 
itembox4.addEventListener('mouseover',function(){
  itemBoxLoop7.play()
  itemBoxLoop8.play()
});
itembox4.addEventListener('mouseout', function(){
  itemBoxLoop7.pause()
  itemBoxLoop8.pause()
  itemBoxLoop7.seekToStart()
  itemBoxLoop8.seekToStart()
});
// ITEM BOX 5
let itembox5 = document.querySelector('.item-box5') 
itembox5.addEventListener('mouseover',function(){
  itemBoxLoop9.play()
  itemBoxLoop10.play()
});
itembox5.addEventListener('mouseout', function(){
  itemBoxLoop9.pause()
  itemBoxLoop10.pause()
  itemBoxLoop9.seekToStart()
  itemBoxLoop10.seekToStart()
});
// ITEM BOX 6
let itembox6 = document.querySelector('.item-box6') 
itembox6.addEventListener('mouseover',function(){
  itemBoxLoop11.play()
  itemBoxLoop12.play()
});
itembox6.addEventListener('mouseout', function(){
  itemBoxLoop11.pause()
  itemBoxLoop12.pause()
  itemBoxLoop11.seekToStart()
  itemBoxLoop12.seekToStart()
});

let timeline = gsap.timeline()

timeline.from(".heading-1,.heading-2, header img, header .top-elem", {
  duration: 0.8,
  ease:'elastic.out(1,0.7)',
  scale: 0,
  opacity: 0,
  stagger: 0.1,
});
timeline.from(".ticker", {
  duration: 0.5,
  opacity: 0,
  y: 50,
  stagger: 0.3,
  ease: "elastic.out(1,0.7)",
});

let circle = document.querySelector('.circle')
gsap.to(".circle", {
  rotate: 720,
  repeat: 1,
  duration: 5,
  scrollTrigger: {
    trigger: ".circle",
    scroller: "body",
    start: "top 60%",
    end: "bottom -1600%",
    scrub: true,
  },
});


gsap.from(".page-2 h1, .page-2 p, .page-2 img ", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-2",
    scroller: "body",
  },
});
gsap.from(".page-3 img, .page-3 div  h1, .page-3 div p", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-3",
    scroller: "body",
  },
});
gsap.from(".page-4 img, .page-4 div  h1, .page-4 div p", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-4",
    scroller: "body",
  },
});
gsap.from(".page-5 img, .page-5 div  h1, .page-5 div p", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-5",
    scroller: "body",
  },
});
gsap.from(".page-6 h1", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".page-6",
    scroller: "body",
  },
});
gsap.from(".page-6 .item-container .item", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".page-6",
    scroller: "body",
  },
});

gsap.from(".frams img , .frams div", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-7",
    scroller: "body",
  },
});

gsap.from('.side-item',{
  scale: 0,
  ease:'bounce2.in',
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".side-scroll-item",
    scroller: "body",
    // markers:true,
    start:'top -10%'
  },

})
const tl = gsap.timeline();
gsap.set('.blur', { filter: 'blur(0px)' });

gsap.from('.blur', {
  duration: 2,
  filter: 'blur(10px)',
  ease: 'power2.out' ,
  scrollTrigger: {
    trigger: ".aside-elme",
    scroller: "body",
    start:'top 0',
    end: 'bottom 0'
  },
});

gsap.from(".blur h1, .blur-btn", {
  scale: 0,
  duration: 1,
  delay:0.5,
  ease: "elastic.out(1,0.7)",
  scrollTrigger: {
    scroller: "body",
    trigger: ".blur",
    start: 'top 0',
    end: 'bottom 0'
  },
});



gsap.from(".item-box", {
  scale: 0,
  duration: 0.6,
  stagger:0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".droll ",
    scroller: "body",
  },
});
setTimeout(()=>{
  gsap.to(".droll svg", {
    scaleY: '100%',
    transformOrigin: "bottom",
    repeat: 1,
    transform: 'scaleY(100%)',
    duration: 0.4,
    delay: 0.7,
    immediateRender: false,
    ease: "power2.out",
    scrollTrigger:{
      trigger: '.droll-item',
  scroller: 'body',
  
    }
  });
}, 900)

setTimeout(()=>{
  gsap.to(".feed img", {
    scaleY: '100%',
    transformOrigin: "bottom",
    repeat: 2,
    transform: 'scaleY(100%)',
    duration: 0.3,
    delay:0.7,
    immediateRender: false,
    ease: "power2.out",
    scrollTrigger:{
      trigger: '.feed',
  scroller: 'body',
  
    }
  });
}, 900)


// navbar effect 

let scroll1 = window.scrollY;

window.onscroll = function(){
  let scroll2 = window.scrollY;
  if(scroll1 > scroll2){
    document.querySelector('nav').style.top = '0';
  }else{
    document.querySelector('nav').style.top = '-100px'
  }
  scroll1 = scroll2;
}


let close = document.querySelector('.close')
let menu = document.querySelector('.open')
let icons = document.querySelectorAll('nav  i')
let list = document.querySelector('nav ul')
let links = document.querySelectorAll('nav ul li')
let nav =  document.querySelector('nav')
let noneList = document.querySelector('.none')
// let navBtn = document.querySelector('nav ul .button  span')
let flag = false;



//   navbar

  icons.forEach((icon)=>{
    icon.addEventListener('click',()=>{
    flag = !flag 
    
    if(flag == true){
        close.style.display = 'block';
        menu.style.display = 'none';
        nav.style.height = '100vh'
        nav.style.backgroundColor = '#ff73b5'
        list.style.display = 'block'
       links.forEach((link)=>{
      if(!link.classList.contains('none')){
        link.style.display = 'block';
        // navBtn.style.display = 'block'
      }else{
        link.style.display = 'none'
      }
       })
  
    }else{
        close.style.display = 'none'
        menu.style.display = 'block'
        nav.style.height = '12vh'
        nav.style.backgroundColor = 'transparent'
       links.forEach(link => link.style.display = 'none')
  
    }
  
  
    })
  })



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});



