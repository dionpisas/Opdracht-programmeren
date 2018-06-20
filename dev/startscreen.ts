class startScreen extends Screens {



    constructor(g:Game){
        super(g, "Start het spel")
        
        this.textfield.addEventListener("click", ()=> this.switchScreens('game'))
        

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "Space":
                console.log("pew pew")
                this.switchScreens('game')
                break
        }
    }
  

}