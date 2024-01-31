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
let btn = gsap.utils.toArray(".button .btn-track");
let btnLoop = horizontalLoop(".button .btn-track", { pause:true, repeat:-1, speed:1.2});

btnLoop.pause();
let btnEle = document.querySelector('.button') 
btnEle.addEventListener('mouseover',function(){
  btnLoop.play()
});
btnEle.addEventListener('mouseout', function(){
  btnLoop.pause()
  btnLoop.seekToStart()
});

let productList = document.querySelector(".product-list");
let productListImg = document.querySelectorAll(".product-list li .parent span");

let links = document.querySelectorAll(".link ");
let link = document.querySelector(".link ");

links.forEach((link) => {
  link.addEventListener("mouseover", (e) => {
    let color = link.getAttribute("data-color");
    productList.style.backgroundColor = color;
  });
});

links.forEach((link) => {
  link.addEventListener("mouseout", () => {
    productList.style.backgroundColor = "#042f1a";
    productList.style.background = "#042f1a";
  });
});

links.forEach((link)=>{
    link.addEventListener('mouseover', (e)=>{
        let img = link.getAttribute('data-link');
        productListImg.forEach((span)=>{
            span.style.backgroundImage = `url(${img})`
        })
    })
})



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


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

let timeline = gsap.timeline()

timeline.from(".contact-header svg", {
  scale: 0,
  opacity: 0,
  duration: 0.7,
  ease: "elastic.out(1,0.6)",
});
timeline.from(".contact-text, .contact-content form", {
  scale: 0,
  opacity: 0,
  duration: 1,
  stagger:0.3,
  ease: "elastic.out(1,0.6)",
});



let close = document.querySelector('.close')
let menu = document.querySelector('.open')
let icons = document.querySelectorAll('nav  i')
let list = document.querySelector('nav ul')
let linkss = document.querySelectorAll('nav ul li')
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
       linkss.forEach((link)=>{
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
       linkss.forEach(link => link.style.display = 'none')
  
    }
  
  
    })
  })
