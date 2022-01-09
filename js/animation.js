const html = document.documentElement;
const canvas = document.getElementById("hero-nomu");
const wrapper = document.getElementById("canvasWrapper");

/**
 * Ranges:
 * 0 - 133 City
 * 134 - 156 nomu
 * 157 - 272 logo
 * 273 - 409 Home
 * 410 - 508 Map
 * 509 - 650 Lens
 * 651 - 699 Profile
 */
const scenes = [0,133,272,409,508,650,699, 809]
const maxSbPos = window.innerHeight * 2;
const segment = maxSbPos/scenes.length
const frameDelay = 1000/60
let currentFrameIndex = 0;
let currentScene = 0
let nextScene = 0
let animationOn = currentScene !== nextScene 
const context = canvas.getContext("2d");
const frameCount = 809;
let images = []
let sceneStack = []
const ranges = calculateRanges()
let currentPos = 0
const currentFrame = index => (
  `/assets/fotogramas/0064${index.toString().padStart(3, '0')}.png`
)

const preloadImages = () => {
  for (var i = 1; i < frameCount; i++) {
    var _img = new Image;
    _img.src = currentFrame(i)
    // _img.width = canvas.width
    // _img.height = canvas.height
    // _img.className = "img-fluid"
    images.push(_img);
  }
  
};


const img = new Image()
img.src = currentFrame(0);
img.className = "img-fluid"
canvas.width= wrapper.offsetWidth;
canvas.height = wrapper.offsetWidth;
img.width = canvas.width
img.height = canvas.height

img.onload=function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0,canvas.width,canvas.width);
}

const updateImage =  index => {
  img.src = currentFrame(index);
  img.width = canvas.width
  img.height = canvas.height
  img.className = "img-fluid"
  context.drawImage(img, 0, 0,canvas.width,canvas.width);
}

// let lastScrollTop = 0;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
// window.addEventListener("scroll", async function(){ // or window.addEventListener("scroll"....
//    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
//    if(animationOn == false){
//     if (st > lastScrollTop && nextScene < scenes.length){
//       nextScene++;
//       await forwardScene()
//       currentScene = nextScene
//    } else if(nextScene > 0){
//      nextScene--;
//     await backwardScene()
//     currentScene = nextScene
//    }
//    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
//    }
// }, false);

async function forwardScene(){
  if(currentScene < nextScene) {
    animationOn = true
    let i = scenes[currentScene];
    while(i < scenes[nextScene]){
      
      context.clearRect(0, 0, context.width, context.height);
      await new Promise(r => setTimeout(r, frameDelay));
      requestAnimationFrame(() => updateImage(i))
      i++;
    }
    animationOn = false
  }
}

async function backwardScene(){
  if(currentScene > nextScene) {
    animationOn = true
    let i = scenes[currentScene];
    while(i > scenes[nextScene]){
      
      context.clearRect(0, 0, context.width, context.height);
      await new Promise(r => setTimeout(r, frameDelay));
      requestAnimationFrame(() =>  updateImage(i))
      i--;
    }
    animationOn = false
  }
}


let currentLocation =  0
var mouseWheel = function() {
  var newLocation = null;
  window.addEventListener('wheel', function(e) {
    e.preventDefault(); // No scroll

    // update our variable at high frequency
    var delta = Math.max(-1, Math.min(1, e.deltaY));
    if (delta == -1) currentLocation -= 1;
    if (delta == 1) currentLocation += 1;
    if (currentLocation < 0) currentLocation = 0;
    if (currentLocation >= (frameCount - 1)) currentLocation = (frameCount - 1);

    if (newLocation === null) { // if set, we already are waiting to draw
      requestAnimationFrame(setImage);
      context.clearRect(0, 0, context.width,context.height);

    }
    newLocation = currentLocation;
  });

  function setImage() {
    if (images[newLocation]) {
      images[newLocation].width = canvas.width
      images[newLocation].height = canvas.height
      images[newLocation].className = "img-fluid"
      context.drawImage(images[newLocation], 0, 0,canvas.width,canvas.width);
    }
    newLocation = null; // so the throttler knows we can draw again
  }

}

// preloadImages()
// images[0].onload = function() {
//   context.clearRect(0, 0, context.width, context.height);
//   context.drawImage(images[0], 0, 0,canvas.width,canvas.width);
//   mouseWheel();
// };

function lockScroll(){
  $('body').css('overflow','hidden');
  $('body').attr('scroll','no');
}



function unlockScroll(){
  $('body').css('overflow','auto');
  $('body').attr('scroll','yes'); 
}

function hideText(){
  $("#text").removeClass("show")
  $("#text").addClass("hide")
}
function showText(){
  const textHtml = `
  <h1>HOLA MUNDO ${currentScene}</h1>
  <p class="fs-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      In lacinia in lectus ut iaculis. 
      Proin imperdiet, erat ut mollis pretium, quam turpis maximus lacus, at pharetra erat enim vitae dui. 
      Donec tortor nibh, consequat eget elementum at, sagittis nec arcu. 
      Vestibulum vel arcu ut felis vulputate placerat. 
      Integer tristique, sapien vitae ullamcorper auctor, turpis quam dictum lacus, vitae auctor metus tortor eget elit. 
      Aliquam ante quam, consectetur ut dui ac, auctor iaculis orci. Nulla faucibus tortor ac molestie tempor. 
      Nullam sed tortor ut erat dapibus tincidunt a a velit. In quis sagittis orci. 
  </p>
  `
  $("#text").html(textHtml)
  $("#text").removeClass("hide")
  $("#text").addClass("show")
}
function calculateRanges(){
  const _segment = (window.innerHeight * 2)/scenes.length
  let result = []
  for(let i = 0; i < scenes.length; i++){
    result.push(_segment*i)
  }


  return result
}
function runAnimation(){
  window.addEventListener("scroll", async (e) => {
    const sb = document.documentElement.scrollTop; 

    const diff = Math.abs(currentPos - sb)

    if(diff >= segment + 1){
      if(animationOn === false){
        lockScroll()
        hideText()
        showText()
        if(sb > currentPos  && currentScene + 1 <= scenes.length ){
          nextScene++
          await forwardScene();
          currentScene = nextScene;
        }else{
          nextScene--
          await backwardScene();
          currentScene = nextScene;
        }

        currentPos = sb
        unlockScroll()
      }
    }


  });
}

calculateRanges()
preloadImages()
runAnimation()