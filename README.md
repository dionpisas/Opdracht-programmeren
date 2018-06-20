# Opdracht-programmeren
Periode 4 opdracht sleutel voor tentamen

Bij de deze game heb ik gebruikt gemaakt van de principes van OOP


All mijn onderdelen heb ik opgesplits in classes.
Om het te versimpelen heb ik gebruik gemaakt van inheritance
Als hoofd classe heb ik gameObject aangemaakt waar de volgende onderdelen vast staan voor de andere classes die onderdelen gaat overerven zoals variables op protected : div, x, y.  En functies : move, remove en draw.
 
 `class GameObject{
  
     protected div : HTMLElement
     protected y: number
     protected x: number
  
      constructor(type:string, parentElement : HTMLElement = document.body){
          this.div = document.createElement(type)
          parentElement.appendChild(this.div)
      }
  
      public move(){
          
          this.draw()
      }
  
      public remove() {
          this.div.remove()
      }
      
      protected draw(){
          this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
      }
  
  }`
 
 
class Spaceship extend GameObject
hier heb ik een prive variable aangemaakt speedX
in deze classe maak ik gebruik van composition zodat de class ook een gun aanmakt.
functie move is overschreven met eigen functionaliteit
een prive functie checkborders
een prive functie voor het schieten van de gun, wordt aangeroepen via object gun
`/// <reference path="gameobject.ts" />
 class SpaceShip extends GameObject{
 
     private speedX : number
     // private speedY : number
 
 
     private gun : Gun
     
 
     constructor(type:string){
         super("spaceship")
         this.speedX = 8
         // this.speedY = 8
         this.y = window.innerHeight- 50
         this.x = window.innerWidth /2
 
         this.gun = new Gun(this.div)
        
 
     }
 
     public move(){
         this.x += this.speedX
         this.gun.move()
         super.move()
 
         this.checkBorders()
     }
 
     private checkBorders() {
         if(this.x + this.div.clientWidth > window.innerWidth || this.x < 0) {
             this.speedX *= -1
         }
     }
 
     private shoot() {
         this.gun.shoot()
     }
 }`

class Gun extend GameObject
deze class heeft geen prive variables
functie OnkeyDown functie om te weten wanneer geschoten moet worden
publieke functie shoot om te schieten.

Bij de class Game maak ik een static gameObject daarin wordt spaceship gepushed en asteroids(gun en bullets)
for of van gameobject en met instance of wordt gecheckt of gameobject een asteroid of bullet heeft en daar wordt collison of gecheckt en asteroids en bullets worden verwijderd na collision

`class Game {
     private numberOfAsteroids : number = 10
 
     private static gameObjects : Array<GameObject>
 
 
     constructor(){
         Game.gameObjects = new Array()
 
         Game.gameObjects.push(new SpaceShip("spaceship"))
         
         for (let i = 0; i < this.numberOfAsteroids; i++) {
             Game.gameObjects.push(new Asteroid("asteroid"))
         }
 
         this.gameloop()
     }
 
     
     
     public checkCollision(a: ClientRect, b: ClientRect): boolean {
         return (a.left <= b.right &&
             b.left <= a.right &&
             a.top <= b.bottom &&
             b.top <= a.bottom)
     }
 
 
     private gameloop(){
 
        
         
 
         for (const gameObject of Game.gameObjects) {
             gameObject.move()
             // console.log(gameObject)
             if(gameObject instanceof Bullet) {
                 for (const asteroid of Game.gameObjects) {
                     if(asteroid instanceof Asteroid) {
                         if (this.checkCollision(gameObject.getRectangle(), asteroid.getRectangle())) {
                             console.log("BOTSING");
                             // remove asteroid
                             asteroid.remove()
                             let index = Game.gameObjects.indexOf(asteroid)
                             Game.gameObjects.splice(index, 1)
                             // remove bullet 
                             gameObject.remove()
                             index = Game.gameObjects.indexOf(gameObject)
                             Game.gameObjects.splice(index, 1)
                             break
                         }
                     }
                 }
             }
         }
 
         requestAnimationFrame(() => this.gameloop())
     }
 
     public static addGameObject(gameObject : GameObject) : void {
         Game.gameObjects.push(gameObject)
     }
 }
 
 window.addEventListener("load", () => new Game())
`


Klassen diagram
-----------------
https://stud.hosted.hr.nl/0949000/wordpress/wp-content/uploads/2018/06/Untitled-Diagram.png

Peer review
---------------
https://github.com/AdriaanGiel/sketch_runner

Heeft aan bijna alle beoordelingen voldaan alleen heeft ie een bug niet kunnen oplossen en daarom is het  spel  nog niet helemaal klaar.
Hij heeft correct gebruikt gemaakt van oververving, compositie en een extra uidaging.



Mijn spel is nog niet volledig klaar mist een eindscherm: 21-6-2018