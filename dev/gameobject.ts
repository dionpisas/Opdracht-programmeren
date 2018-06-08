class GameObject{

   protected div : HTMLElement
   protected y: number
   protected x: number

    constructor(type:string, parentElement : HTMLElement = document.body){
        this.div = document.createElement(type)
        parentElement.appendChild(this.div)
    }

    public move(){
        
        this.draw()
    }

    protected remove(){

    }
    
    protected draw(){
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}