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
        if(index >= this.frames.length)
            index = this.frames.length - 1;
        return this.frames[index];
    }

    drawCurrentFrame(position,flip = false){
        let frame = this.getCurrentFrame();
        if(frame != null){
            core.ctx.save();
            core.ctx.translate(position[0], position[1]);
            if(flip)
                core.ctx.scale(-1,1);
            core.ctx.drawImage(frame,respX(-this.size/2),respX(-this.size),respX(this.size),respX(this.size));
            core.ctx.restore();
        }
    }

    play(loop = true){
        this.time += core.deltaTime;
        if(this.time > this.duration){
            this.time = loop ? 0 : this.time;
            return true;
        }
        return false;
    }

    restart(){
        this.time = 0;
    }
}

class Player{
    constructor(x,type,size,speed,limit = 10000000){
        this.position = glMatrix.vec2.fromValues(respX(x),respY(780));
        this.limit = limit;

        this.idleAnimation = new Animation(`${type}/idle`,3,size,0.33);
        this.walkAnimation = new Animation(`${type}/marche`,9,size,0.7);

        this.speed = speed;
        this.mouseX = 0;
        this.stop = false;

        this.moveInput = false;
        this.lookLeft = false;

        this.customAnim = null;
        
        document.addEventListener("mousemove", (e)=>{
            this.mouseX = (e.clientX - window.innerWidth/2)/ window.innerWidth * 2;
        });
    }

    jumpToPosition(x,speed){
        TweenMax.to(core,speed,{camPosition:x,ease: Back.easeIn.config(1.7)});
    }

    playCustomAnim(anim){
        this.customAnim = anim;
    }

    update(){
        if(!this.stop){
            if(this.customAnim){
                if(this.customAnim.play()){
                    this.customAnim = null;
                }
            }else if(Math.abs(this.mouseX) < 0.5){
                this.idleAnimation.play();
                this.walkAnimation.restart();
                this.moveInput = true;
            }else{
                core.camPosition += respX(this.mouseX < 0 ? -this.speed * core.deltaTime : this.speed * core.deltaTime);
                if(core.camPosition < 0){
                    core.camPosition = 0;
                }else if(core.camPosition > this.limit + window.innerWidth){
                    core.camPosition =  this.limit + window.innerWidth;
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
        if(this.customAnim){
            this.customAnim.drawCurrentFrame(this.position, this.lookLeft);
        }else if(this.moveInput){
            this.idleAnimation.drawCurrentFrame(this.position, this.lookLeft);
        }else{
            this.walkAnimation.drawCurrentFrame(this.position, this.lookLeft);
        }
    }
}

class Plane{
    constructor(src,depth,position = 0){
        this.img = new Image();
        this.img.src = src;
        this.depth = depth;
        this.position = respX(position);
        this.deplacementX = 0;
    }

    update(){
        this.deplacementX = -Math.round(core.camPosition * this.depth); 
    }

    draw(){
        if(this.img.complete){
            let c_width = window.innerWidth/1980 * this.img.naturalWidth;
            core.ctx.drawImage(this.img,this.deplacementX + this.position,0,c_width,window.innerHeight);
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

class CinematicEffect{
    constructor(){
        this.frames = new Array();
        this.frames.length = 9;
        for(let i = 0; i < 9; i++){
            let frame = new Image();
            frame.onload = () => { this.frames[i] = frame };
            frame.src = `Ressources/cinematic_effect/${i}.png`;
        }
        this.currentFrame = null;
        this.timer = 0;
    }

    update(){
        if(this.timer > 0.1){
            this.timer = 0;
            let oldframe = this.currentFrame;
            while(oldframe == this.currentFrame){
                this.currentFrame = this.frames[Math.floor(this.frames.length * Math.random())];
            }
        }else{
            this.timer += core.deltaTime;
        }
    }

    draw(){
        if(this.currentFrame != null)
            core.ctx.drawImage(this.currentFrame,0,0,window.innerWidth,window.innerHeight);
    }
}

class Mouse{
    constructor(position, nest){
        this.position = respX(position);

        this.targetPostion = respX(position);
        this.screenPosition = 0;
        this.nest = nest;

        this.idleAnimation = new Animation(`souris/idle`,3,100,0.33);
        this.walkAnimation = new Animation(`souris/marche`,4,100,0.4);
    }

    update(){
        if(Math.abs(this.position - (core.camPosition + window.innerWidth/2)) < respX(200)) {
            this.targetPostion = this.position + respX(300 * Math.random() + 300);
        }

        if(this.position > this.nest.position){
            core.destroy(this);
        }else if(this.targetPostion > this.position){
            this.position += respX(200) * core.deltaTime;
            this.walkAnimation.play();
        }else{
            this.idleAnimation.play();
        }
    }

    draw(){
        let pos = glMatrix.vec2.fromValues(this.position - core.camPosition,respY(780));
        if(this.targetPostion <= this.position){
            this.idleAnimation.drawCurrentFrame(pos,false);
        }else{
            this.walkAnimation.drawCurrentFrame(pos,false);
        }
    }
}

class MouseNest{
    constructor(position){
        this.position = respX(position);
        this.size = respX(75);
        this.refuge_nrm = new Image();
        this.refuge_exp = new Image();

        this.isbroken = false;

        this.refuge_nrm.src = "Ressources/scenes/level1/refuge/refuge1.png";
        this.refuge_exp.src = "Ressources/scenes/level1/refuge/refuge2.png"
    }

    draw(){
        console.log(this.isbroken);
        if(this.refuge_nrm.complete && !this.isbroken){
            core.ctx.save();
            core.ctx.translate(this.position - core.camPosition,respY(780) + respX(8));
            core.ctx.drawImage(this.refuge_nrm,respX(-this.size/2),respX(-this.size),respX(this.size),respX(this.size));
            core.ctx.restore();
        }else if(this.refuge_exp.complete){
            core.ctx.save();
            core.ctx.translate(this.position - core.camPosition,respY(780) + respX(8));
            core.ctx.drawImage(this.refuge_exp,respX(-this.size/2),respX(-this.size),respX(this.size),respX(this.size));
            core.ctx.restore();
        }
    }
}


class Maitre{
    constructor(position){
        this.position = respX(position);
        this.animation = new Animation(`maitre`,6,500,0.6);
        this.active = false;
    }

    update(){
        if(this.active)
            this.animation.play(false);
    }

    draw(){
        let pos = glMatrix.vec2.fromValues(this.position - core.camPosition,respY(780) + respX(83));
        this.animation.drawCurrentFrame(pos,false);
    }
}

class Loader{
    constructor(x,y,size){
        this.position = glMatrix.vec2.fromValues(respX(x),respY(y));
        this.walkAnimation = new Animation(`chat/marche`,9,size,0.7);
    }

    update(){
        this.walkAnimation.play();  
    }

    draw(){
        this.walkAnimation.drawCurrentFrame(this.position, false);
    }
}