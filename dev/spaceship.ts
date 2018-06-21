/// <reference path="gameobject.ts" />
class SpaceShip extends GameObject{

    private speedX : number
    private gun : Gun
    

    constructor(type:string){
        super("spaceship")
        this.speedX = 8
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
}