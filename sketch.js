//Create variables here
var dog, database, happyDog;
var foodS;
var foodStock;
var dogSprite;

function preload()
{
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png"); 
}

async function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250, 250, 70, 70); 
  dogSprite.addImage("HAPPY",happyDog);
  dogSprite.addImage("doggy", dog); 
  dogSprite.changeImage("doggy", dog);
  foodStock = await database.ref("Food").once("value") ;
  if(foodStock.exists()){
    foodS = foodStock.val();
  database.ref("Food").on("value", function(data){
     foodS = data.val();
  });
}

 

}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  text("No. of bottles :" + foodS, 100, 400);
 //dogSprite.changeImage("HAPPY", happyDog);  
  
}



function writeStock(x){
  database.ref("/").update({
    Food:x
  })
}
function keyPressed(){
if(keyCode = "up"){
  foodS = foodS - 1;
  writeStock(foodS);
  dogSprite.changeImage("HAPPY",happyDog);
  }
}
