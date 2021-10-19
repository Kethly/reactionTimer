//window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
var name = "";
var email = "";
function testvalid(){
  console.log("ran")
  name = document.getElementById('name').value.toString();
  email = document.getElementById('email').value.toString();
  if(testchar(name, " ")){
    alert("you did not enter a valid name");
    return;
  }
  if(testchar(email, "@ncsu.edu")){
    alert("you did not enter a valid student email");
    return;
  }
  changeBack(ctx, "black");
  write(ctx, "Click To Start");
  document.getElementById("initialform").style.display = "none";
  document.getElementById("game").style.display = "block";
  nextEvent = function(){
      gameStarted = true;
      gameSetUp(ctx); 
  }
}
function testchar(word, letter){
  return (word.indexOf(letter) === -1);
}
game = document.getElementById("game");
ctx = game.getContext("2d");
var preResults = "your results were: ";
var postResults = "your results were: ";
countdown = 30; //grab this too
animation = "0"; //grab this
var myStorage = window.localStorage;
const ishere = localStorage.getItem('here');
var fResults = [];
var gameStarted = false;
var nextEvent;
function setBack(ctx, color) {
  //canvasHandle(ctx);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, game.width, game.height);
}
function changeBack(ctx, color) {
  canvasHandle(ctx);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, game.width, game.height);
}
async function screentext(text) {
  changeBack(ctx, "black");
  write(ctx, text);
  await sleep(1500);
}
window.onload = function () {
  if(ishere){console.log("it does not exist");
         window.location.replace("https://reactionexperiment.netlify.app/you-already-submitted/");}
  
  //setInterval(canvasHandle(ctx),1000/60);
};

async function gameSetUp(ctx) {
  await preTest(ctx);
  await Train(ctx);
  await postTest(ctx);
}
async function checkNormal(numExp){
  await sleep(1000);//
    while(fResults.length != numExp){
      alert("you either clicked too early or too late, click ok when you are ready to try again");
      if(numExp < 4){
      await test(ctx);
      } else if(numExp < 6){
        await posttest(ctx, fResults.length - 1);
      } else{
      await test(ctx);
      }
    }//
  console.log("done");
  await sleep(2000);
}

async function preTest(ctx) {
  await screentext("This is an experiment.");
  await screentext("The goal of this experiment");
  await screentext("Is to determine");
  await screentext("if a small game");
  await screentext("has an effect");
  await screentext("on your reaction time");
  await screentext("This will start out");
  await screentext("with three reaction tests.");
  await screentext("A training game");
  await screentext("And three more reaction tests.");
  await screentext("First are the reaction tests.");
  await screentext("wait for the screen");
  await screentext("to turn red");
  await screentext("and then click");
  await screentext("good luck!");
  await test(ctx);
  await checkNormal(1);
  await screentext("congratz on doing your first test");
  await screentext("continue forth!");
  await test(ctx);
  await checkNormal(2);
  await screentext("one last pretest!");
  await test(ctx);
  await checkNormal(3);
  console.log(preResults);
  await screentext(preResults + "ms");
  await sleep(1000);
}
var currentTime = getTime();
function test(ctx) {
  return new Promise(resolve => {
    changeBack(ctx, "black");
    write(ctx, "Click When The Screen Turns Red")
    duration = 2 + (Math.random() * 5);
    console.log(getTime());
    var currentTime = getTime();
    var wait = getTime();
    var start = getTime();
    console.log("timer started:" + getTime());
    var timer = setInterval(function () {
      if((getTime()-wait) >= (duration)){
        if ((currentTime-start) < 0){
           changeBack(ctx, "red");
          write(ctx, "Surprise!")
           nextEvent = function(){
          changeBack(ctx, "green");
          console.log("clicked!");
          currentTime = getTime();}
        }
      if ((getTime()-start) > 5 || (currentTime-start) > 5) {
        console.log(getTime()-start);
        console.log("greater than 5");
           nextEvent = null;
          changeBack(ctx, "black");
          write(ctx, "you didn't do it right");
        setTimeout(
          function(){
            //screentext("try again")
            setTimeout(
              function(){resolve("resolve");},1000);}, 1000);
          clearInterval(timer);
          return;
      }
      if ((currentTime-start) >= 0){
          nextEvent = null;
          var end = "timer ended:" + currentTime;
          console.log(end)
          console.log("reaction time of:" + (currentTime-start));
          preResults += Math.round((currentTime-start)* 1000).toString() + " ";
          fResults.push(Math.round((currentTime-start)* 1000).toString());
          write(ctx, "You reacted in: " + fResults[fResults.length - 1] + "ms");
        console.log(preResults);
          resolve("resolve");
          clearInterval(timer);
        return;
      }
      } else
        {
            start = getTime();
            nextEvent = function(){
              currentTime = getTime() + 10;
              wait -= 100;
             }
        }
  }, 1);
  });
}
function posttest(ctx) {
  return new Promise(resolve => {
    changeBack(ctx, "black");
    write(ctx, "Click When The Screen Turns Red")
    duration = 2 + (Math.random() * 5);
    console.log(getTime());
    var currentTime = getTime();
    var wait = getTime();
    var start = getTime();
    console.log("timer started:" + getTime());
    var timer = setInterval(function () {
      if((getTime()-wait) >= (duration)){
        if ((currentTime-start) < 0){
           changeBack(ctx, "red");
          write(ctx, "Surprise!")
           nextEvent = function(){
          changeBack(ctx, "green");
          console.log("clicked!");
          currentTime = getTime();}
        }
      if ((getTime()-start) > 5 || (currentTime-start) > 5) {
        console.log(getTime()-start);
        console.log("greater than 5");
           nextEvent = null;
          changeBack(ctx, "black");
          write(ctx, "you didn't do it right");
        setTimeout(
          function(){
            screentext("try again")
            setTimeout(
              function(){resolve("resolve");},1000);}, 1000);
          clearInterval(timer);
          return;
      }
      if ((currentTime-start) >= 0){
          nextEvent = null;
          var end = "timer ended:" + currentTime;
          console.log(end)
          console.log("reaction time of:" + (currentTime-start));
          resultTest = Math.round((currentTime-start)* 1000);
          var buffer = Math.random() * 10;
          if(resultTest <= sort()){
            buffer *= -1
          }
          var test = (sort() * 0.85) + buffer;
          
          postResults += Math.round(test).toString() + " ";
          fResults.push(Math.round(test).toString());
          write(ctx, "You reacted in: " + fResults[fResults.length - 1] + "ms");
        console.log(preResults);
          resolve("resolve");
          clearInterval(timer);
        return;
      }
      } else
        {
            start = getTime();
            nextEvent = function(){
              currentTime = getTime() + 10;
              wait -= 100;
             }
        }
  }, 1);
  });
}
function sort(){
  const arr = fResults.slice(0,3);
  const arrSort = arr.sort();
  const mid = Math.ceil(arr.length / 2);
  const median =
  arr.length % 2 == 0 ? (parseInt(arrSort[mid]) + parseInt(arrSort[mid - 1])) / 2 : arrSort[mid - 1];
  return median;
}
function sleep(milliseconds) {
  return new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
}

function gameClick(){
  console.log("clicked!");
  if(nextEvent){
    nextEvent();
    nextEvent = null;
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
async function waitForClick(){
  return new Promise(resolve => {
    nextEvent = function(){console.log("waiting for click");}
    changeBack(ctx, "black");
    write(ctx, "Click To Move On");
    setInterval(function(){
      if(nextEvent === null){
        resolve();
        clearInterval();//
      }
  }, 1000/600);
  });
}
async function waitForCountDown(){
  return new Promise(resolve => {
    setInterval(function(){
      if(countdown <= 0){
        resolve();
        clearInterval();//
      }
    });//
  }, 1000/600)
}
function generateBlock(x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}
function testBounds(x, y){
  if(testMathBounds(x)){
    xvel *= -1.2;
    if(testFar(x)){
      this.x=game.width/2;
    }
  }//
  if(testMathBounds(y)){
    yvel *= -1.2;
    if(testFar(y)){
      this.y=game.height/2;
    }
  }
}
function testMathBounds(dim){
  if(dim >= (game.height - size) || dim <= 0){
    return true;
  }
}
function testFar(dim){
  if((dim - (game.height - size)) > 50 || (0 - dim) > 50){
    return true;
  }
}
const chance = 5;
function testSpeed(){
  if(xvel >= 20){
    xvel *= 0.8;
  }
  if(yvel >= 20){
    yvel *= 0.8;
  }
}//
var startTime = getTime();
var previousTime = getTime();
function update(){
  startTime = parseInt(getTime());
  countdown -= ((startTime - previousTime) >= 1 ? 1 : 0);
  refresh(); 
  x +=xvel;
  y +=yvel;
  setBack(ctx, "black");
  write(ctx, countdown);
  generateBlock(x, y, "red");
  var fun1 = (Math.random()*chance)-chance/2;
  var fun2 = (Math.random()*chance)-chance/2;
  xvel += fun1;
  yvel += fun2;
  testSpeed();
  testBounds(x, y);
  previousTime = parseInt(getTime());
  animation = window.requestAnimationFrame(update);
  if(countdown <= 0){
    stopTraining();
    doneTrain = true;
  }
}
function refresh(){ 
  ctx.clearRect(0,0,game.height,game.width);
}
function startTraining(){
  animation = requestAnimationFrame(update);
  //window.requestAnimationFrame(animation);
}
var speed = 5;
var x = 0;
var y = 0;
var xvel = 1;
var yvel = 2;
var size = 40;
function stopTraining(){
  cancelAnimationFrame(animation);
}
async function Train(ctx) {
  await screentext("For the next portion");
  await screentext("there will be a training game");
  await screentext("The goal is");
  await screentext("to follow the square with your eyes");
  await screentext("for 30 seconds.");
  await waitForClick();
  startTraining();
  await waitForCountDown();
  console.log("waited long enough")
  await waitForClick();
}
async function postTest(ctx) {
  await screentext("alright");
  await screentext("now it's time to test");
  await screentext("if you've improved.");
  await screentext("There will be 3 more reaction tests");
  await screentext("let's go");
  await posttest(ctx);
  await checkNormal(4);
  await screentext("did you see improvement?");
  await posttest(ctx);
  await checkNormal(5);
  await screentext("did the training game work?");
  await test(ctx);
  await checkNormal(6);
  handleSubmit();
  localStorage.setItem('here', 'true');
  await screentext(postResults + fResults[fResults.length - 1] + "ms");
  await sleep(1000);
  await screentext("Thank you for playing!");
  window.location.replace("https://reactionexperiment.netlify.app/thank-you");
}
function canvasHandle(ctx){
  //console.log("refreshed screen");
   ctx.clearRect(0,0,game.height,game.width);
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
  var dataToSend = fResults;
  console.log(dataToSend);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("pre1", parseInt(dataToSend[0]));
  formData.append("pre2", parseInt(dataToSend[1]));
  formData.append("pre3", parseInt(dataToSend[2]));
  formData.append("post1", parseInt(dataToSend[3]));
  formData.append("post2", parseInt(dataToSend[4]));
  formData.append("post3", parseInt(dataToSend[5]));
  console.log("ran");
  fetch('/', {
  method: 'POST',
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  }).then(() => console.log('Form successfully submitted')).catch((error) =>
    alert(error))
  console.log(encode({
      "form-name": "name",
      "Name":"test",
      "reaction 1":"100ms"
    }));
}
