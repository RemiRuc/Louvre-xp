/* 
 * Class Interaction : Allow to create interaction for the game
 * 1st parameter (String) : type of interaction (slice/hover/shake/spin)
 * 2nd parameter (String) : id of the HTML Tag where we want to do the interaction
 * 
 * ====== Slice ======
 * 3rd parameter and 4th parameters : respectivly x and y values of the vector to draw
 * -- To a slice verticaly from up to down : x = 0 and y = 1
 * -- To a slice verticaly from down to up : x = 0 and y = -1
 * -- To a slice horizontaly from right to left : x = 1 and y = 0
 * -- To a slice horizontaly from left to right : x = -1 and y = 0
 * 
 * ====== Shake ======
 * 3rd parameter (int) : Value to reach (a good value is 100)
 */

class Interaction{
    constructor(type, id, val1, val2,callback){
        this.div = document.getElementById(id)
        this.div.style.backgroundColor = "rgba(0,0,0,0.5)";
        this.type = type
        this.callback = callback;
        /*** 
         * SLICE 
         ***/
        if (type === "slice") {
            /* 1: Direction of the slice to do
             * 2: Direction drawed by the user
             */
            this.directionToDraw = glMatrix.vec2.fromValues(val1, val2) // 1
            this.directionDrawed = glMatrix.vec2.fromValues(0, 0) // 2

            /* save the coordinates of the swip
             * [O] = x of the 1st press
             * [1] = Y of the 1st press
             * [2] = x of the release
             * [3] = y of the release
             */
            this.clientMouse = [0, 0, 0, 0]

            // Angle between the direction of the slice and the direction drawed by the user
            this.angle = 0

            this.div.onmousedown = (event)=>{
                this.clientMouse[0] = event.clientX
                this.clientMouse[1] = event.clientY
            }
            this.div.onmouseup = (event)=>{
                this.clientMouse[2] = event.clientX
                this.clientMouse[3] = event.clientY
                this.sliceSuccess()
            }
        }
        /*** 
         * SHAKE
         ***/
        if (type === "shake") {
            /*
             * 1: Actual value of the shake
             * 2: Value that we want to reach
             */
            this.actualValue = 0 // 1
            this.successValue = val1 // 2
            this.mouseDown = false

            /*
             * Detect if the user press the click or not
             */
            this.div.onmousedown = ()=>{
                this.mouseDown = true
            }
            this.div.onmouseup = ()=>{
                this.mouseDown = false
            }

            this.div.onmousemove = ()=>{
                if (this.mouseDown) {
                    this.actualValue++
                    console.log(this.actualValue)
                    if (this.actualValue >= this.successValue) {
                        this.shakeSuccess()
                    }
                }
            }
        }
    }


    sliceSuccess(){
        this.directionDrawed = glMatrix.vec2.fromValues(this.clientMouse[2] - this.clientMouse[0], this.clientMouse[3] - this.clientMouse[1])
        this.angle = glMatrix.vec2.angle(this.directionToDraw, this.directionDrawed)*(180/Math.PI)
        console.log(this.angle)

        if (this.angle <= 12) {
            console.log('success')
            this.div.style.backgroundColor = "transparent";
            this.callback();
            this.div.onmousedown = null
            this.div.onmouseup = null
        } else {
            console.log('error')
        }
    }

    shakeSuccess(){
        console.log('success')
        this.div.onmousedown = null
        this.div.onmouseup = null
        this.div.onmousemove = null
    }
}
