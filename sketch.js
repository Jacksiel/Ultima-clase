const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink, eat, sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  //para que corran
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;


  sad.looping = false;
  eat.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  //velocidad de animación
  blink.frameDelay = 17;
  eat.frameDelay = 17;
  sad.frameDelay = 10;

  //Botón
  button = createImg('cut_button.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(200,696,600,20);

  bunny = createSprite(200,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food, fruit.position.x, fruit.position.y, 60, 60);
  };

  push();
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  };
  pop();
  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit, bunny) == true){
    bunny.changeAnimation('eating');
  };

  if(collide(fruit, ground.body) == true){
    bunny.changeAnimation('crying');
  };

 drawSprites();
   
}

function drop(){
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function collide(body, sprite){

  //NEGACIÓN "!" o, no es igual. En este caso, body NO es igual a null

  if(body!=null){
    //SI EL CUERPO NO ES NULA
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    
    if(d<= 80){
      //Se remueve del mundo la fruta
      World.remove(engine.world, fruit);
      fruit = null;
      //Afirmación de que la fruta es nula "Efectivamente la fruta no existe"
      return true;
    }

    else{
      //Si no se llevo a cabo que se removiera la fruta entonces existe
      //"No, la fruta si existe"
      //Esto se lo estamos diciendo al "if"
      return false;
    }
  }
}