class Game {
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
