class Bullet extends GameObject{

    private speedY: number

    constructor(x: number, y:number){
        super("bullet")
        this.speedY = 10

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