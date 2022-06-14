//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;

function preload()
{
	//load images here
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
}


function draw() {  
  background("pink")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);


   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}



  drawSprites();
  textSize(17);
  fill("black");
  text("Press the Up arrow key to feed Drago.",100,150);
  text("Food Remaining = "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}



