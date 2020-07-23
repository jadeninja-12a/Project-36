//Create variables here
var dog, database, happyDog;
var dogSprite;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var foodS = 20;
var gameState;
var bedroom, garden, washroom, sadDog;
function preload()
{
  //load images here
  bedroom = loadImage("../images/Bed Room.png");
  garden = loadImage("../images/Garden.png");
  washroom = loadImage("../images/Wash Room");
  dog = loadImage("../dogImg.png");
  happyDog = loadImage("../dogImg1.png"); 
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  dogSprite = createSprite(1000, 250, 70, 70); 
  dogSprite.addImage("HAPPY",happyDog);
  dogSprite.addImage("doggy", dog); 
  dogSprite.changeImage("doggy", dog);
  foodObj = new Food();
  foodObj.getFoodStock();
  feed = createButton("Feed");
  feed.position(900, 100); 
  addFood = createButton("Add Food")
  addFood.position(1000, 95);
  var foodStockRef = await database.ref("Food").once("value");
  if(foodStockRef.exists()){
    foodS = foodStockRef.val();
    foodObj.getFoodStock();
  }
}

 




function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  
  foodObj.display();
   
 
 feed.mousePressed(feedDog);
 addFood.mousePressed(addFoods); 

 fedTime = database.ref('lastFed');
 fedTime.on("value", function(data){
   lastFed = data.val();
 });
 textSize(30);
  fill(0, 0, 0);
  database.ref("gameState").on("value", function(data){
    gameState = data.val();
  })
  if(lastFed>12){
    console.log(lastFed);
    text("Last Feed : " + (lastFed - 12) + " p.m.", 350, 30);
  } else if(lastFed==12){
    text("Last Feed : 12 p.m.", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 a.m.", 350, 30);
  } else{
    text("Last Feed : " + lastFed + " a.m.", 350, 30);
  }
  if(gameState != "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  if(currentTime == lastFed + 1||
   currentTime == (lastFed + 1) - 24){
       garden();
       update("playing");
     } else if(currentTime == lastFed + 2||
     currentTime == (lastFed + 2) - 24){
       bedroom();
       update("sleeping");
     } else if(currentTime == lastFed + 4 
      || currentTime == (lastFed + 4) - 24){
        washroom();
        update("bathing");
      } else {
        update("hungry");
        dog.display();
      }
}
function update(state){
  database.ref("/").update({
    gameState:state
  });
}
function currentTime(){
  return hour();
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function feedDog(){
  dogSprite.changeImage("HAPPY",happyDog);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodS);
  foodObj.getFoodStock();
  database.ref('/').update({
    lastFed:hour()
  });
}
  