/// <reference path="gameobject.ts" />

class Asteroid extends GameObject {

    private speedY : number
 
    

    constructor(type:string){
        super("asteroid")
        
        this.speedY = Math.random() * 10 + 2
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
    }

    public move() {
        this.y += this.speedY

        this.repeatAsteroids()

        super.move()
    }

    public repeatAsteroids(){
        if(this.y > window.innerHeight){
            this.x = Math.random() * (window.innerWidth - 100)
            this.y = - 400 - (Math.random() * 450)
        }
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    
}