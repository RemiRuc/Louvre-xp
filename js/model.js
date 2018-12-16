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
            core.ctx.translate(position[0], position[1]);
            if(flip)
                core.ctx.scale(-1,1);
            core.ctx.drawImage(frame,-this.size/2,-this.size/2,this.size,this.size);
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
    constructor(x,y){
        this.position = glMatrix.vec2.fromValues(x,y);

        this.idleAnimation = new Animation("idle",3,250,0.33);
        this.walkAnimation = new Animation("marche",9,250,0.8);

        this.mouseX = 0;
        this.stop = false;

        this.moveInput = false;
        this.lookLeft = false;
        
        document.addEventListener("mousemove", (e)=>{
            this.mouseX = (e.clientX - window.innerWidth/2)/ window.innerWidth * 2;
        });
    }

    update(){
        if(!this.stop){
            if(Math.abs(this.mouseX) < 0.5){
                this.idleAnimation.play();
                this.walkAnimation.restart();
                this.moveInput = true;
            }else{
                core.camPosition += this.mouseX < 0 ? -300 * core.deltaTime : 300 * core.deltaTime;
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
    constructor(src,depth,width){
        this.img = new Image();
        this.img.src = src;
        this.depth = depth;
        this.deplacement = 0;
        this.width = width;
    }

    update(){
        this.deplacement = -core.camPosition * this.depth; 
    }

    draw(){
        if(this.img.complete){
            core.ctx.save();
            core.ctx.translate(this.deplacement, 0);

            let c_width = window.innerWidth/1980 * this.img.naturalWidth;
            core.ctx.drawImage(this.img,0,0,c_width,window.innerHeight);
            core.ctx.restore();
        }
    }
}

class PositionEvent{
    constructor(x,callback){
        this.position = x;
        this.callback = callback;
        this.triggered = false;
    }

    update(){
        if(core.camPosition > this.position && !this.triggered){
            this.callback();
            this.triggered = true;
        }
    }
}