/**
 * Text Animation
 * 1st parameter : An array of string. Each element of the array refer to a line (Add '*' at the begening of the line to make the line BOLD)
 * 2nd parameter : The id to give to the DOM Element
 * 3rd and 4th parameter : Strings to place the parent DOM on the page. Respectivly top then left
 */

class TextAnimation{
    constructor(texts, top, left,origin){
        /* Create parent DOM element */
        this.parent = document.createElement('div')
        this.parent.style.top = top
        this.parent.style.left = left
        this.parent.classList.add('text-apparition')

        this.origin = respX(origin) - respX(450);

        /* Stock the differents lines as a DOM elements */
        this.lines = []
        for (let i = 0; i < texts.length; i++) {
            /* Create a line */
            let line = document.createElement('div')
            for (let j = 0; j < texts[i].length; j++) {
                /* Add a '*' in the text to make the line bold, don't add this caracter if it's a '*' */
                if (texts[i][j] == '*'){
                    line.classList.add('bold')
                } else {
                    /* Add letter to the line */
                    let letter = document.createElement('span')
                    letter.innerHTML = texts[i][j]
                    line.appendChild(letter)
                }
            }
            /* Shift the lines depending of the line */
            line.style.marginLeft = i*20 + 'px'
            this.lines.push(line)
            this.parent.appendChild(line)
        }
        document.body.appendChild(this.parent)

        /* Animation for apparing the letter
         * delay :
         * - i*value for the delay of a line
         * - j*value for the delay of the letters
         */
        for (let i = 0; i < this.lines.length; i++) {
            for (let j = 0; j < this.lines[i].children.length; j++) {
                TweenMax.to(this.lines[i].children[j], 1, {opacity:1, delay: (i*0.5 + j*0.05) });
            }
        }
    }

    update(){
        TweenMax.set(this.parent,{x:this.origin - core.camPosition,force3D:true});
    }
}

function KillText(){
    document.querySelectorAll('.text-apparition').forEach((text)=>{
        text.remove();
    });
}

