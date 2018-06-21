class gameScreen extends Screens{

    private numberOfAsteroids : number = 0
     


constructor(g:Game){
    super(g, "")

    

    Game.gameObjects = new Array()

    Game.gameObjects.push(new SpaceShip("spaceship"))

    var sound = new Howl({
        src: ['../docs/images/sound.mp3']
      });
      
      sound.play();
      
      
    
    for (let i = 0; i < this.game.numberOfAsteroids; i++) {
         let test = new Asteroid("asteroid")
         Game.gameObjects.push(test)
         this.numberOfAsteroids++
        
    }

}

    public update(){
        
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
                            // console.log(this.list.length);
                            this.numberOfAsteroids--
                            if(this.numberOfAsteroids  == 0){
                                this.switchScreens('gameover')
                            }

                            break
                        }
                    }
                }
            }
           }
        }
    }
