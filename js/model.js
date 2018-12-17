class Animation{
    constructor(folderName,nbFrames,size,duration){
        this.frames = [];
        this.frames.length = nbFrames;
        for(let i = 0; i < nbFrames; i++){
            let frame = new Image();
            frame.onload = () => { this.frames[i] = frame };
            frame.src = `Ressources/Anim/${folderName}/${i}.png`;
        }
        this.duration = duration;
        this.size = size;

        this.time = 0;
    }

    getCurrentFrame(){
        if(this.frames.length === 0){
            return null;
        }
        let index = Math.floor(this.time/this.duration * (this.frames.length));
        return this.frames[index];
    }

    drawCurrentFrame(position,flip = false){
        let frame = this.getCurrentFrame();
        if(frame != null){
            core.ctx.save();
            core.ctx.translate(respX(position[0]), respY(position[1]));
            if(flip)
                core.ctx.scale(-1,1);
            core.ctx.drawImage(frame,respX(-this.size/2),respX(-this.size),respX(this.size),respX(this.size));
            core.ctx.restore();
        }
    }

    play(){
        this.time += core.deltaTime;
        if(this.time > this.duration){
            this.time = 0;
        }
    }

    restart(){
        this.time = 0;
    }
}

class Player{
    constructor(x,type,size,speed){
        this.position = glMatrix.vec2.fromValues(x,780);

        this.idleAnimation = new Animation(`${type}/idle`,3,size,0.33);
        this.walkAnimation = new Animation(`${type}/marche`,9,size,0.7);

        this.speed = speed;
        this.mouseX = 0;
        this.stop = false;

        this.moveInput = false;
        this.lookLeft = false;
        
        document.addEventListener("mousemove", (e)=>{
            this.mouseX = (e.clientX - window.innerWidth/2)/ window.innerWidth * 2;
        });
    }

    update(){
        if(!this.stop){0
           if(Math.abs(this.mouseX) < 0.5){
                this.idleAnimation.play();
                this.walkAnimation.restart();
                this.moveInput = true;
            }else{
                core.camPosition += respX(this.mouseX < 0 ? -this.speed * core.deltaTime : this.speed * core.deltaTime);
                if(core.camPosition < 0){
                    core.camPosition = 0;
                }
                this.walkAnimation.play();
                this.idleAnimation.restart();
                this.moveInput = false;
            }
            this.lookLeft = this.mouseX < 0;
        }else{
            this.moveInput = false;
        }
    }

    draw(){
        if(this.moveInput){
            this.idleAnimation.drawCurrentFrame(this.position, this.lookLeft);
        }else{
            this.walkAnimation.drawCurrentFrame(this.position, this.lookLeft);
        }
    }
}

class Plane{
    constructor(src,depth){
        this.img = new Image();
        this.img.src = src;
        this.depth = depth;
        this.deplacementX = 0;
    }

    update(){
        this.deplacementX = -Math.round(core.camPosition * this.depth); 
    }

    draw(){
        if(this.img.complete){
            let c_width = window.innerWidth/1980 * this.img.naturalWidth;
            core.ctx.drawImage(this.img,this.deplacementX,0,c_width,window.innerHeight);
        }
    }
}

class PositionEvent{
    constructor(x,callback){
        this.position = respX(x);
        this.callback = callback;
        this.triggered = false;
    }

    update(){
        if(core.camPosition > this.position - respX(450) && !this.triggered){
            this.callback();
            this.triggered = true;
        }
    }
}

class Mouse{
    constructor(position, nest){
        this.position = respX(position);

        this.targetPostion = respX(position);

        this.screenPosition = 0;
        this.nest = nest;
    }

    update(){
        if(Math.abs(this.position - (core.camPosition + window.innerWidth/2)) < respX(200)) {
            this.targetPostion = this.position + respX(300 * Math.random() + 300);
        }
        if(this.position > this.nest.position){
            core.destroy(this);
        }else if(this.targetPostion > this.position){
            this.position += respX(200) * core.deltaTime;
        }
    }

    draw(){
        core.ctx.beginPath();
        core.ctx.rect(this.position - core.camPosition,respY(780) - 20,20,20);
        core.ctx.fillStyle = "red";
        core.ctx.fill();
    }
}

class MouseNest{
    constructor(position){
        this.position = respX(position);
    }

    draw(){
        core.ctx.beginPath();
        core.ctx.rect(this.position - core.camPosition,respY(780) - 50,50,50);
        core.ctx.fillStyle = "green";
        core.ctx.fill();
    }
}
