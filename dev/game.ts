class Game {
    private _numberOfAsteroids : number = 10

    public static gameObjects : Array<GameObject>

    private activeScreen : Screens

    private screens:any = {
        gameover : GameOver,
        start : startScreen,
        game : gameScreen
    }
    // private  gamescreen : StartScreen | Game | GameOver


    constructor(){

        this.activeScreen = new this.screens.start(this)


        this.gameloop()
    }

    
    public changeScreens(name:string){
        this.activeScreen.cleanScreen()
        this.activeScreen = new this.screens[name](this)
    }

    public  get numberOfAsteroids(){
         return this._numberOfAsteroids
    }

  
    private gameloop(){

        this.activeScreen.update()
        requestAnimationFrame(() => this.gameloop())
    }

    public static addGameObject(gameObject : GameObject) : void {
        Game.gameObjects.push(gameObject)
    }
}

window.addEventListener("load", () => new Game())
