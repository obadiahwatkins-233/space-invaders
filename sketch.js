
// https://freeinvaders.org/
//Check out this free space invaders game to see what the basic space invaders functionality is



class Game{
    constructor(){
      // what data should we keep track of for each game?
       
    }
  }
  
  class Level{
    constructor(data){
      this.levelNumber = data.levelNumber;
      this.alienMoveFrequency = data.alienMoveFrequency
      // What are some other important pieces of data we should keep track of for each level?
    }
  
  }
  
  
  
  
  
  let ship;
  let aliens = [];
  
  //We are going to set up logic to only be allowed to fire one bullet at a time, but you might want to have the option to fire multiple bullets at a time
  let bullets = [];
  let alienBullets = []; // Added array to track alien's bullets
  
  let frameCount = 0;
  let alienMoveFrequency = 12;
  
  //  !!!
  let score = 0;   // ADDED SCORE VARIABLE TO TRACK PLAYER SCORE
  let player_lives = 3; // ADDED PLAYER LIVES VARIABLE WITH 3 LIVES MAX
  //  !!!
  
  class Ship {
  constructor(){
      this.x = width / 2;
      this.direction = 0;
  }
  
  show(){
      fill(255);
      rectMode(CENTER);
      rect(this.x, height - 20, 20, 60);
  }
  setDir(direction){
      this.direction = direction;
  }
  
  move(){
      this.x += this.direction * 5;
  }
  }
  let hitCounter = 0;  // ADDED HIT COUNTER VARIABLE

  class AlienBullets{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.toDelete = false;
  }
  show(){
      fill(50, 0, 200);
      ellipse(this.x, this.y, 8, 8);
  }
      
  
  evaporate(){
      this.toDelete = true;
  }
  
  hits(alien){
      let d = dist(this.x, this.y, alien.x, alien.y);
      if (d < 30) {
        return true;   
      } 
      return false;
  }
  
  move(){
      this.y = this.y - 15;
  }
  
  }
  

  class Alien{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.direction = 1;
      this.toDelete = false;
      
      
    }
    
    show(){
      fill(255, 0, 200);
      ellipse(this.x, this.y, 60, 60);
      
    }
    
    destroy(){
      this.toDelete = true;  
    }
    
    move(){
      this.x = this.x + (this.direction * 10);
    }
    
    shiftDown(){
       this.y = this.y + 60;
        this.direction = this.direction * -1;
    }
  }
  //Need to add more to the bullet code so that I can only shoot 1 bullet at a time
  class Bullet{
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.toDelete = false;
  }
  show(){
      fill(50, 0, 200);
      ellipse(this.x, this.y, 8, 8);
  }
      
  
  evaporate(){
      this.toDelete = true;
  }
  
  hits(alien){
      let d = dist(this.x, this.y, alien.x, alien.y);
      if (d < 30) {
        return true;   
      } 
      return false;
  }
  
  move(){
      this.y = this.y - 15;
  }
  
  }
  
   //  !!!
  let resetButton;

  function setup() {
    createCanvas(1000, 500);
    frameRate(240 );
    ship = new Ship();
    for (let i = 0; i < 12; i++) {
      aliens[i] = new Alien(i * 60 + 60, 60);
    }
  
    // GET THE RESET ELEMENT BY ID
    resetButton = document.getElementById('resetButton');

    // RESET BUTTON EVENT LISTENER
    resetButton.addEventListener('click', resetGame);
  }
  
  function resetGame() {
    // RESET GAME VARIABLES
    score = 0;
    player_lives = 3;
    ship.x = width / 2;
    ship.y = height - 20;
  
    // RE-DRAW THE ALIENS
    aliens = [];
    for (let i = 0; i < 12; i++) {
      aliens[i] = new Alien(i * 60 + 60, 60);
    }
  
    // RESTART THE GAME
    loop();
  }
   //  !!!
  
  function draw() {
    background(0);
    frameCount++;
  
  
    ship.show();
    ship.move();
    // this is bullet hit checking section - did the bullet hit anything?
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].show();
      bullets[i].move();
      if(bullets[i].y < 0){
        bullets[i].evaporate();
      }
      for (let j = 0; j < aliens.length; j++) {
        if (bullets[i].hits(aliens[j])) {
          aliens[j].destroy();
          score += 10;
          bullets[i].evaporate();
          }
      }
    }
    
    let hitEdge = false;
  
  
    let moveAliens = false;
    if(frameCount % alienMoveFrequency === 0){
      moveAliens = true;
    }
  
    if(moveAliens){
  
      for (let i = 0; i < aliens.length; i++) {
        aliens[i].show();
        aliens[i].move();
        // console.log("moved the aliens")
        if (aliens[i].x > width || aliens[i].x < 0) {
          hitEdge = true;
        }
      }
  
    } else{
      for (let i = 0; i < aliens.length; i++) {
        aliens[i].show();
      }
  
    }
    
  
    if (hitEdge) {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i].shiftDown();
  
      }
    }

     //  !!!
     // CRASH DETECTION FOR ALIENS
  for (let j = 0; j < aliens.length; j++) {
    if (ship.y < aliens[j].y + 30 && ship.y + 30 > aliens[j].y && ship.x + 10 > aliens[j].x && ship.x - 10 < aliens[j].x) {
      player_lives--; // PLAYER LOSES A LIFE IF ALIEN REACHES BOTTOM
      if (player_lives === 0) {
        // PLAYER RUNS OUT OF LIVES - GAME ENDS
        noLoop();
        console.log("Game Over");
      }
      ship.x = width / 2;
      ship.y = height - 20;
    }
  }
    //  !!!
  
    //deletes any bullets marked to be deleted
    for (let i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].toDelete) {
        bullets.splice(i, 1);
      }
    }
  
    for (let i = aliens.length - 1; i >= 0; i--) {
      if (aliens[i].toDelete) {
        aliens.splice(i, 1);
      }
    }

  //  !!!
   // DRAW PLAYER LIVES & SCORE
   fill(255);
   textSize(20);
   text("Score: " + score, 10, 30);
   text("Lives: " + player_lives, 10, 60);
 }
  //  !!!
  
  //Player Controls Section
  
  function keyReleased() {
    if (key != ' ') {
      ship.setDir(0);
    }
  }
  
  function keyPressed() {
    if (key === ' ') {
      if(bullets.length === 0){
        let bullet = new Bullet(ship.x, height);
        bullets.push(bullet);
      }
      
      
    }
    
    if (keyCode === RIGHT_ARROW) {
      ship.setDir(1);
  
    } else if (keyCode === LEFT_ARROW) {
      ship.setDir(-1);
  
    }
  }
  
  