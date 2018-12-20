const core = {};

// Animated obj in the canvas (with Update & Draw methods)
core.gameObjects = new Array();


//Add Obj to the core.update
core.instantiate = function(obj){
    this.gameObjects.push(obj);
    return obj;
}

//Remove obj from core.update and delete it from the memory
core.destroy = function(obj){
    for(let i = 0; i < this.gameObjects.length; i++){
        if(this.gameObjects[i] == obj){
            this.gameObjects.splice(i,1);
        }
    }
    obj = null;
    delete obj;
}

core.reset = function(){
    core.camPosition = 0;
    core.gameObjects = new Array();
    KillText();
}

core.ctx = null;
core.time =0;
core.deltaTime = 0;
core.camPosition = 0;


core.update =  function(){
    core.deltaTime = (Date.now() - core.time)/1000;
    core.time = Date.now();

  //  console.log(core.gameObjects);

    core.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    if(core.gameObjects.length > 0){

        core.gameObjects.forEach((gameObject)=>{
            if(typeof gameObject.update !== "undefined")
                gameObject.update();
        });

        for(let i = core.gameObjects.length - 1; i>=0 ;i--){
            if(typeof core.gameObjects[i].draw !== "undefined")
                core.gameObjects[i].draw();
        }
    }

    requestAnimationFrame(core.update);
}

core.init = function(){

    let canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    core.ctx = canvas.getContext("2d");

    core.time = Date.now();

    core.update();
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
    Menu.showMenu()
    setTimeout(()=>{
        document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
        if (lvl<4) {
            document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).classList.add("unlock");
        }
    },500)
    
    switch (lvl) {
        case 1:
            document.querySelector(`.lvl_btn[data-lvl="2"]`).addEventListener("click",()=>{
                Menu.hideMenu()
                core.scene2()
            })
            break;
        case 2:
            document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).addEventListener("click",()=>{
                Menu.hideMenu()
                core.scene3()
            })
            break;
        case 3:
            document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).addEventListener("click",()=>{
                Menu.hideMenu()
                core.scene4()
            })
            break;
    
        default:
            break;
    }
}


core.curtainShow = function(callback,title,subtitle){

    document.querySelector("#curtain h2").textContent = title;
    document.querySelector("#curtain h3").textContent = subtitle;
    TweenMax.to("#curtain",0.5,{opacity:1});

    TweenMax.to("#curtain h2",0.5,{opacity:1,delay:1});
    TweenMax.to("#curtain h3",0.5,{opacity:1,delay:1.3});

    TweenMax.to("#curtain h2",0.5,{opacity:0,delay:4.3});
    TweenMax.to("#curtain h3",0.5,{opacity:0,delay:4});

    TweenMax.to("#curtain",0.5,{opacity:0,delay:5});
    setTimeout(callback,3000);
}  

core.menuloader = function(){
    core.instantiate(new Loader(500,535,70));
}

let test;

core.scene1 = function(){
    core.reset();

    core.instantiate(new CinematicEffect());
    core.instantiate(new Plane("Ressources/scenes/level1/flou_exterior.png",1.8,6000));
    core.instantiate(new Plane("Ressources/scenes/level1/plan-flou.png",1.5,400));

    core.instantiate(new Plane("Ressources/scenes/level1/Colonnes_sas.png",1));

    test = core.instantiate(new Plane("Ressources/scenes/level1/plantation.png",0.8));

    let nest = core.instantiate(new MouseNest(6500));
    let player = core.instantiate(new Player(400,"chat",100,500,17800));
    core.instantiate(new Mouse(5000,nest));
    core.instantiate(new Mouse(5100,nest));
    core.instantiate(new Mouse(5200,nest));
    core.instantiate(new Mouse(4950,nest));

    let maitre = core.instantiate(new Maitre(3330));


    core.instantiate(new Plane("Ressources/scenes/level1/Sol.png",1));
    core.instantiate(new Plane("Ressources/scenes/level1/objets_maison.png",0.9));
    core.instantiate(new Plane("Ressources/scenes/level1/mur.png",0.8));

    core.instantiate(new Plane("Ressources/scenes/level1/Montagnes1.png",0.15));
    core.instantiate(new Plane("Ressources/scenes/level1/Montagnes2.png",0.08));
    core.instantiate(new Plane("Ressources/scenes/level1/Montagnes3.png",0.03));
    core.instantiate(new Plane("Ressources/scenes/level1/soleil.png",0.01));

    core.instantiate(new PositionEvent(800,()=>{
        core.instantiate(new TextAnimation(["Dans l’Egypte Antique,","*le chat", "occupait une place majeure"], '30%','80%',800));
    }));

    core.instantiate(new PositionEvent(1800,()=>{
        core.instantiate(new TextAnimation(["Il était protégé par","des lois interdisant","de l’insulter ou de le contrarier"], '15%','80%',1800));
    }));

    core.instantiate(new PositionEvent(2300,()=>{
        core.instantiate(new TextAnimation(['Il était alors l’objet','de nombre d’attentions'], '20%','80%',2300));
    }));

    core.instantiate(new PositionEvent(3200,()=>{
        player.stop = true;
        new Shake(()=>{
            player.stop = false;
            maitre.active = true;
        },75);
    }));

    core.instantiate(new PositionEvent(3500,()=>{
        core.instantiate(new TextAnimation(["C'était également un fidèle","*Protecteur","Auprès des cultivateur"], '20%','80%',3500));
    }));

    core.instantiate(new PositionEvent(4500,()=>{
        core.instantiate(new TextAnimation(["*Gardien","des récoltes","et des plantations"], '20%','80%',4500));
    }));

    core.instantiate(new PositionEvent(5500,()=>{
        core.instantiate(new TextAnimation(["Il repoussait","*les rats","et autres nuisibles"], '20%','80%',5500));
    }));

    core.instantiate(new PositionEvent(6300,()=>{
        player.stop = true;
        player.playCustomAnim(new Animation(`chat/saut`,9,100,0.8));
        new Slice(()=>{
            player.jumpToPosition(respX(6100),0.4);
            player.stop = false;
            setTimeout(() => {
                nest.isbroken = true;
            }, 500);
        },1,0);
    }));


    core.instantiate(new PositionEvent(7000,()=>{
        core.instantiate(new TextAnimation(["Des temples leur étaient", " même dédiés notamment à", "*Bubastis"], '20%','80%',7000));
    }));

    core.instantiate(new PositionEvent(8100,()=>{
        Menu.lvlFinished(1);
    }));
}

core.scene2 = function(){
    core.reset();

    core.instantiate(new CinematicEffect());
    core.instantiate(new Plane("Ressources/scenes/level2/plan-flou.png",1.5,400));
    let player = core.instantiate(new Player(400,"chat",100,1000));

    core.instantiate(new Plane("Ressources/scenes/level2/sol.png",1));
    core.instantiate(new Plane("Ressources/scenes/level2/perso.png",0.9));
    core.instantiate(new Plane("Ressources/scenes/level2/mur.png",0.8));
    core.instantiate(new Plane("Ressources/scenes/level2/statue.png",0.7));
    core.instantiate(new Plane("Ressources/scenes/level2/paysage.png",0.03));
}

function respX(val){
    return val * window.innerWidth/1000;
}

function respY(val){
    return val * window.innerHeight/1000;
}
