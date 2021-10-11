var dog,sadDog,happyDog;
var feed, addFood;
var foodStock, foodS, lastFed;
var database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    food:foodObj.getFoodStock()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

