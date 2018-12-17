const core = {};

// Animated obj in the canvas (with Update & Draw methods)
core.objects = new Array();


//Add Obj to the core.update
core.instantiate = function(obj){
    this.objects.push(obj);
    return obj;
}

//Remove obj from core.update and delete it from the memory
core.destroy = function(obj){
    for(let i = 0; i < this.objects.length; i++){
        if(this.objects[i] == obj){
            this.objects.splice(i,1);
        }
    }
    obj = null;
    delete obj;
}

core.ctx = null;
core.deltaTime = 0;
core.camPosition = 0;

core.init = function(){

    let canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    core.ctx = canvas.getContext("2d");

    let time = Date.now();

    function update(){

        core.deltaTime = (Date.now() - time)/1000;
        time = Date.now();

        core.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

        for(let i = core.objects.length - 1; i>=0 ;i--){
            if(typeof core.objects[i].update !== "undefined")
                core.objects[i].update();
        }

        for(let i = core.objects.length - 1; i>=0 ;i--){
            if(typeof core.objects[i].draw !== "undefined")
                core.objects[i].draw();
        }
        requestAnimationFrame(update);
    }

    update();
}

window.addEventListener("load",core.init);