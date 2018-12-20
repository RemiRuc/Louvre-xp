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
        TweenMax.to(".halo.left", 1, {left: (-250*window.innerWidth)/1180, ease: Expo.easeOut})
        TweenMax.to(".halo.right", 1, {right: (-250*window.innerWidth)/1180, ease: Expo.easeOut})
    }})
    document.querySelector(".logo").classList.add("little")
    TweenMax.to("#myCanvas", 1, {opacity: 0, onComplete:()=>{
        document.getElementById("myCanvas").style.opacity = "1"
        core.reset()
    }})
}

//* POURQUOI C'EST LA CA ??!!!! EST CE QUE CA SERT OU PAS ????? */
Menu.lvlFinished = function(lvl){
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

document.querySelector(`.lvl_btn[data-lvl="1"]`).addEventListener("click", (target)=>{
    Menu.hideMenu()
    core.scene1()
    core.curtainShow(()=>{
        core.reset();
        Menu.showMenu();
        setTimeout(()=>{
            document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
            document.querySelector(`.lvl_btn[data-lvl="${lvl}"]`).classList.add("active");
        },2800);
    },"Morceau de l'amulette débloqué","Fin du chapitre");
  
}
let lvlnames = ["Le culte des chats","Bastet, déesse des chats","Rites funéraires","Le voyage vers le royaume d'Osiris"]
document.querySelectorAll(".lvl_btn").forEach(el => {
    el.addEventListener("click", (target)=>{
        let level = parseInt(target.target.attributes[1].nodeValue)
        core.curtainShow(()=>{
            Menu.hideMenu()
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
    })
})

Menu.showLandingPage()