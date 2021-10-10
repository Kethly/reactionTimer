
game = document.getElementById("game");
ctx = game.getContext("2d");
var preResults = "your results were: ";
var gameStarted = false;
function changeBack(ctx, color) {
  canvasHandle(ctx);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, game.width, game.height);
}
function screentext(ctx, color, text) {
  
  canvasHandle(ctx);
  changeBack(ctx, color);
  write(ctx, text);

  
}
window.onload = function () {
  changeBack(ctx, "black");
  write(ctx, "Click To Start");

  //setInterval(canvasHandle(ctx),1000/60);
};

function gameSetUp(ctx) {
  preTest(ctx);
  Train(ctx);
  postTest(ctx);
}

async function preTest(ctx) {
  screentext(ctx, "black", "this will first consist");
  await sleep(1000);
  screentext(ctx, "black", "of three reaction tests");
  await sleep(2000);
  screentext(ctx, "black", "good luck!");
  await sleep(2000);
  await test(ctx);
  await sleep(1000);
  screentext(ctx, "black", "congratz on doing your first test");
  console.log("this ran");
  await sleep(3000);
  console.log("waited 3 seconds")
  screentext(ctx, "black", "continue forth!");
  await sleep(1000);
  await test(ctx);
  await sleep(1000);
  screentext(ctx, "black", "one last pretest!");
  await sleep(3000);
  await test(ctx);
  await sleep(1000);
  console.log(preResults);
  screentext(ctx, "black", preResults + "ms");
}

function test(ctx) {
  return new Promise(resolve => {
    
    changeBack(ctx, "black");
    write(ctx, "Prepare to click")
    duration = 2 + (Math.random() * 5);
    console.log(getTime());
    setTimeout(function(){
    changeBack(ctx, "red");
    write(ctx, "Surprise!")
    var start = getTime();
    clickAllowed = true;
    console.log("timer started:" + getTime());
    var result;

    var timer = setInterval(function () {

      if ((getTime()-start) > 5) {
          result = -1;
          resolve("resolve");
          clearInterval(timer);
      }
      if ((currentTime-start) > 0){
          result = 1;
          var end = "timer ended:" + currentTime;
          console.log(end)
          console.log("reaction time of:" + (currentTime-start));
          preResults += Math.round((currentTime-start)* 1000).toString() + " ";
        console.log(preResults);
          resolve("resolve");
          clearInterval(timer);
      }
  }, 1);

  },(duration * 1000));
  });
}
var currentTime = getTime();
var clickAllowed = true;


function sleep(milliseconds) {
  return new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
}

function gameClick(){
  if(clickAllowed === true){
    if(gameStarted === true){
  changeBack(ctx, "green");
  console.log("clicked!");
  currentTime = getTime();
  clickAllowed = false;
    }
    else
    {
      gameStarted = true;
      gameSetUp(ctx); 
      clickAllowed = false
    }
  }
}
function write(ctx, text){
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(text, game.width/2, game.height/2);
}
function getTime(){
  const d = new Date();
  return d.getTime()/1000;
}
function Train(ctx) {}
function postTest(ctx) {}
function canvasHandle(ctx){
  console.log("refreshed screen");
   ctx.clearRect(0,0,game.height,game.width);
}
function gameTimer(){
  
}
function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}
const handleSubmit = (e) => {
  //e.preventDefault()
  //let myForm = document.getElementById('pizzaOrder');
  //let formData = new FormData(myForm)
  //let myForm = document.getElementById('contact');
  let formData = new FormData();
  formData.append("form-name", "reactionData");
  formData.append("name","Data");
  formData.append("reaction 1", "100");
  formData.append("reaction 2", "200");
  formData.append("reaction 3", "300");
  console.log("ran");
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "name",
      "name":"test",
      "reaction 1":"100ms"
    })
  }).then(() => console.log(`OK`))
  console.log(encode({
      "form-name": "name",
      "name":"test",
      "reaction 1":"100ms"
    }));
}
