class Bullet extends GameObject{

    private speedY: number
    public y : number
    private game: Game


    constructor(x: number, y:number, game:Game){
        super("bullet")
        this.speedY = 10
        this.game = game

        //above gun
        this.x = x
        this.y = y

        this.draw()
    }

    public move(){

        this.y -= this.speedY

        super.move()
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}