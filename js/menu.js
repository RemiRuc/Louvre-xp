let Menu = {}

Menu.hideMenu = function(){
    document.getElementById("menu").style.display = "none";
  //  document.getElementById("myCanvas").style.display = "block"
    document.getElementById("interaction").style.display = "block"
    document.querySelector(".logo").style.display = "none"
}

Menu.showMenu = () => {
    document.getElementById("menu").style.display = "flex";
    document.querySelector(".logo").style.display = "block"
    document.getElementById("interaction").style.display = "none"
    //document.getElementById("myCanvas").style.display = "none"
}

Menu.showLandingPage = ()=>{
    document.querySelector("#unhover-button").addEventListener("mouseenter",()=>{

        TweenMax.to("#unhover-button", 0.3, {opacity: 0})
    })


    document.querySelector("#unhover-button").addEventListener("mouseout",()=>{
        TweenMax.to("#unhover-button", 0.3, {opacity: 1})
    })

    document.querySelector("#unhover-button").addEventListener("click",()=>{
        Menu.hideLandingPage()
    })

    core.menuloader();
    document.getElementById("menu").style.display = "none"
    document.getElementById("interaction").style.display = "none"
}

Menu.hideLandingPage = ()=>{
    
    TweenMax.to("#explorer", 1, {opacity: 0})
    TweenMax.to("#sub-title", 1, {opacity: 0, onComplete:()=>{
        document.getElementById("menu").style.display = "flex"
        TweenMax.to("#menu", 0.3, {opacity: 1})
        let width = '0vw'
        TweenMax.to(".halo.left", 1, {left: width, ease: Expo.easeOut})
        TweenMax.to(".halo.right", 1, {right: width, ease: Expo.easeOut})
    }})
    document.querySelector(".logo").classList.add("little")
    TweenMax.to("#myCanvas", 1, {opacity: 0, onComplete:()=>{
        document.getElementById("myCanvas").style.opacity = "1"
        core.reset()
    }})
}

Menu.lvlFinished = function(lvl){
    core.curtainShow(()=>{
        core.reset();
        Menu.showMenu();
        TweenMax.set("#logo_canvas",{display:"none"});
        TweenMax.set("#chapter_canvas",{display:"none"});
        setTimeout(()=>{
            document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
            if (lvl<4) {
                document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).classList.add("unlock");
            }
        },2800);
    },"Morceau de l'amulette débloqué","Fin du chapitre");

    switch (lvl) {
        case 1:
            document.querySelector(`.lvl_btn[data-lvl="2"]`).addEventListener("click",()=>{
                Menu.loadlvl(2);
            })
            break;
        case 2:
            document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).addEventListener("click",()=>{
                Menu.loadlvl(3);
            })
            break;
        case 3:
            document.querySelector(`.lvl_btn[data-lvl="${lvl+1}"]`).addEventListener("click",()=>{
                Menu.loadlvl(4);
            })
            break;
    
        default:
            break;
    }
}

document.querySelector(`.lvl_btn[data-lvl="1"]`).addEventListener("click", (target)=>{
    Menu.loadlvl(1);
});


document.querySelector("#logo_canvas").addEventListener("click",()=>{
    core.curtainShow(()=>{
        core.reset();
        Menu.showMenu();
        TweenMax.set("#logo_canvas",{display:"none"});
    },"Retour au menu");
});


let lvlnames = ["Le culte des chats","Bastet, déesse des chats","Rites funéraires","Le voyage vers le royaume d'Osiris"];
Menu.loadlvl = function(level){
        core.curtainShow(()=>{
            Menu.hideMenu()
            TweenMax.set("#logo_canvas",{display:"block"});
            TweenMax.set("#chapter_canvas",{display:"block"});
            document.getElementById("chapter_canvas").textContent = "Chapitre "+ level + " : " +lvlnames[level-1];
            switch (level) {
                case 1:
                    core.scene1()
                    break;    
                case 2:
                    core.scene2()
                    break;       
                default:
                    break;
            }
        },"Chapitre "+ level,lvlnames[level-1]);
   
}

Menu.showLandingPage()