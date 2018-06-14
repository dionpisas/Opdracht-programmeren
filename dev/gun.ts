class Gun extends GameObject{

    constructor(parentElement: HTMLElement){
        super("gun", parentElement)

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
        
        Game.addGameObject(new Bullet(x, y))
    }   

    public move() {
      
    }

   


    
}