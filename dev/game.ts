class Game {
    private numberOfAsteroids : number = 10

    private gameObjects : Array<GameObject>


    constructor(){
        this.gameObjects = new Array()

        this.gameObjects.push(new SpaceShip("spaceship", this))
        
        for (let i = 0; i < this.numberOfAsteroids; i++) {
            this.gameObjects.push(new Asteroid("asteroid"))
        }
        
        this.gameObjects.push()

        this.gameloop()
    }

    
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }


    private gameloop(){

       
        

        for (const gameObject of this.gameObjects) {
            gameObject.move()
            console.log(gameObject)
        }

        requestAnimationFrame(() => this.gameloop())
    }
}

window.addEventListener("load", () => new Game())
