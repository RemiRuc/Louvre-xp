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

        for(let i = core.objects.length - 1; i>=0 ;i--){
            if(typeof core.objects[i].update !== "undefined")
                core.objects[i].update();
        }

        core.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
   
        for(let i = core.objects.length - 1; i>=0 ;i--){
            if(typeof core.objects[i].draw !== "undefined")
                core.objects[i].draw();
        }

        requestAnimationFrame(update);
    }

    update();
}

/*window.addEventListener("load",core.init){
    core.hideMenu();
    core.scene1();
}*/

window.addEventListener("load",core.init);


core.hideMenu = function(){
    document.getElementById("menu").style.display = "none";
}

core.lvlFinished = function(lvl){
    document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
}

core.scene1 = function(){
    core.instantiate(new Plane("Ressources/scenes/maison/plan-flou.png",1.5,3));

    let player = core.instantiate(new Player(400,"chat",100,100));
    let nest = core.instantiate(new MouseNest(3000));
    core.instantiate(new Mouse(1000,nest));
    core.instantiate(new Mouse(1100,nest));
    core.instantiate(new Mouse(1200,nest));
    core.instantiate(new Mouse(950,nest));

    core.instantiate(new Plane("Ressources/scenes/maison/plan-4-sol.png",1,3));
    core.instantiate(new Plane("Ressources/scenes/maison/plan-3-objets.png",0.85,3));
    core.instantiate(new Plane("Ressources/scenes/maison/plan-2-mur.png",0.7,3));

    core.instantiate(new PositionEvent(2800,()=>{
        player.stop = true;
        new Slice(()=>{
            player.stop = false;
        },-1,1);
    }));
}

function respX(val){
    return val * window.innerWidth/1000;
}

function respY(val){
    return val * window.innerHeight/1000;
}
