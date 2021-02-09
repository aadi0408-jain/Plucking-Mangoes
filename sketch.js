
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj, groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5;
var world,boy, boyImage;
var slingShot;
var stone, stoneImage;

function preload(){
	boy=loadImage("boy.png");
	stone=loadImage("stone.png");
  }

function setup() {
	createCanvas(1500, 700);

	engine = Engine.create();
	world = engine.world;

	stone = new Stone(160, 500, 20);
	mango1=new mango(1300,300,30);
	mango2=new mango(1400,250,30);
	mango3=new mango(1300,200,30);
	mango4=new mango(1390,300,30);
	mango5=new mango(1200,300,30);
  treeObj=new tree(1300,680);
	groundObject=new Ground(width/2,600,width,20);
	boy=new Boy(250, 600);
	slingShot=new Slingshot(stone.body, {x:160, y:500});

  var render = Render.create({ element: document.body, engine: engine, options:{ width: 1300, height:600, wireframes: false } })
	
	Engine.run(engine);

}

function draw() {
  rectMode(CENTER);
  background(500);

  fill('red');
  textSize(24);
  text("PRESS SPACE TO GET A SECOND CHANCE TO PLAY", 200,200);
  groundObject.display();
  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  slingShot.display();
  boy.display();
  stone.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);

  drawSprites();

}
function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x:mouseX, y:mouseY});
}
function mouseReleased(){
    slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(stone.body,{x:160, y:500});
    slingShot.attach(stone.body);
  }
}
function detectCollision(lstone,lmango){
  stoneBodyPosition = lstone.body.position
  mangoBodyPosition = lmango.body.position

  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
  if(distance <= lmango.r + lstone.r){
    Matter.Body.setStatic(lmango.body, false);
  }

}