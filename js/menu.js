let Menu = {}

Menu.hideMenu = function(){
    document.getElementById("menu").style.display = "none";
  //  document.getElementById("myCanvas").style.display = "block"
    document.getElementById("interaction").style.display = "block"
}

Menu.showMenu = () => {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("interaction").style.display = "none"
    //document.getElementById("myCanvas").style.display = "none"
}



Menu.lvlFinished = function(lvl){
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

Menu.showMenu()