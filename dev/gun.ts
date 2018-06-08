class Gun extends GameObject{

    private bullets : Array<Bullet> = new Array()
    private game : Game

    constructor(parentElement: HTMLElement,game: Game){
        super("gun", parentElement)

        this.game = game
        // above and center of spaceShip
        this.x = 10
        this.y = -30

        this.draw()

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "Backspace":
                console.log("pew pew")
                this.shoot()
                break
        }
    }

    public shoot(){
        let y = this.div.getBoundingClientRect().top
        let x = this.div.getBoundingClientRect().left + 10
        
        this.bullets.push(new Bullet(x, y, this.game))
    }   

    public move() {
        for (const bullet of this.bullets) {
            bullet.move()
        }
    }

    public get  getBullets(){

        return this.bullets
    }


    
}