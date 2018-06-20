class Screens {

    protected textfield: HTMLElement
    protected game : Game
    

    constructor(g:Game, textfield:string) {
        this.game = g
        this.textfield = document.createElement("textfield")
        this.textfield.innerHTML = textfield
        document.body.appendChild(this.textfield)

        
        // this.textfield.addEventListener("click", ()=> this.switchScreens())
    }

    public update() {
        
    }

    public cleanScreen(){
        
        document.body.innerHTML = ""
    }

    protected switchScreens(name:string){
        //je moet game doorgeven
       this.game.changeScreens(name)
    }

    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

}